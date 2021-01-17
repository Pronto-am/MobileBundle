<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Controller\Api\V1;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\Api\BaseApiController;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Translation;
use Pronto\MobileBundle\Entity\TranslationKey;
use Pronto\MobileBundle\Exceptions\ApiException;
use Pronto\MobileBundle\Exceptions\TranslationKeys\ZipFileNotCreatedException;
use Pronto\MobileBundle\Utils\File;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\KernelInterface;
use ZipArchive;

class TranslationController extends BaseApiController
{
    /**
     * API-docs: Retrieve the translations of this app
     *
     * @api {get} /v1/translations Retrieve the translations
     * @apiName RetrieveTranslations
     * @apiGroup Translation
     * @apiVersion 1.0.0
     *
     * @apiUse OAuthAuthorizationHeader
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "data": {
     *         "identifier": "zC9WahWKVTcdG5BfLfHPU9",
     *         "app_user": null,
     *         "firebase_token": "d7zgIyAXz_E:APA91bF2arcF8QMeeUHH32WBH8wKBJVTyr9WFnIL8BYJP_f6B9_Qn0ZY1zfVoyaelCAKjdsKz09UNbGxe0QcGARmU-pqeilNqKqRh",
     *         "apns_token": "59CF77D83300612895C8EAEFE51B443B4017F4303",
     *         ...
     *       }
     *     }
     *
     * @apiUse InvalidParameters
     * @apiUse AuthorizationErrors
     */

    /**
     * @param Request $request
     * @param KernelInterface $kernel
     * @param EntityManagerInterface $entityManager
     * @return JsonResponse|Response
     * @throws \Pronto\MobileBundle\Exceptions\ApiException
     */
    public function indexAction(Request $request, KernelInterface $kernel, EntityManagerInterface $entityManager)
    {
        // Validate the authorization
        $this->validateAuthorization();

        $format = $request->query->get('format', 'json');
        $platform = $request->query->get('platform');

        if ($format === 'xml') {
            $platform = 'android';
        } else if ($format === 'plist') {
            $platform = 'ios';
        }

        $application = $this->prontoMobile->getApplication();

        $filters = [
            'application' => $application,
        ];

        // Filter by platform when provided
        if ($platform !== null) {
            $platform = strtolower($platform);

            if (in_array($platform, ['android', 'ios'], true)) {
                $filters[$platform] = true;
            }
        }

        $translations = $entityManager->getRepository(TranslationKey::class)->findBy($filters, [
            'identifier' => 'asc'
        ]);

        if ($format === 'json') {
            return $this->successResponse($this->serializer->serialize($translations));
        }

        if ($format === 'xml') {
            return $this->exportXml($translations, $kernel, $application);
        }
    }

    /**
     * @param array $translations
     * @param KernelInterface $kernel
     * @param Application $application
     * @return Response
     * @throws ApiException
     */
    private function exportXml(array $translations, KernelInterface $kernel, Application $application)
    {
        $directory = time();

        $languages = array_reduce($translations, function ($result, $translationKey) use ($application) {
            /** @var TranslationKey $translationKey */
            /** @var Translation $translation */
            foreach ($translationKey->getTranslations() as $translation) {
                $key = $translation->getLanguage();

                if ($key === $application->getDefaultLanguage()) {
                    $key = 'base';
                }

                if (!isset($result[$key])) {
                    $result[$key] = [];
                }

                $result[$key][$translationKey->getIdentifier()] = $translation->getText();
            }

            return $result;
        }, []);

        // Create the directory
        if (!is_dir($kernel->getProjectDir() . '/tmp')) {
            mkdir($kernel->getProjectDir() . '/tmp');
        }

        mkdir($kernel->getProjectDir() . '/tmp/' . $directory);

        $files = [];

        foreach ($languages as $key => $translations) {
            $folder = $key === 'base' ? 'values' : 'values-' . $key;
            $folder = sprintf($kernel->getProjectDir() . '/tmp/' . $directory . '/%s', $folder);

            mkdir($folder);

            $filename = $folder . '/strings.xml';
            $files[] = $filename;

            $handle = fopen($filename, 'w+');

            if ($handle === false) {
                echo 'failed to create file ' . $filename . PHP_EOL;
                continue;
            }

            fwrite($handle, '<resources>' . PHP_EOL);

            foreach ($translations as $identifier => $text) {
                if (empty($text)) {
                    continue;
                }

                fwrite($handle, '    <string name="' . $identifier . '">' . $text . '</string>' . PHP_EOL);
            }

            fwrite($handle, '</resources>' . PHP_EOL);
            fclose($handle);
        }

        // Create a zip file
        $zip = new ZipArchive();
        $zipFileName = date('Y-m-d') . ' Translations.zip';

        if ($zip->open($zipFileName, ZipArchive::CREATE) !== true) {
            throw new ZipFileNotCreatedException();
        }

        // Add the files to the zip
        foreach ($files as $file) {
            $fileName = explode('/', $file);
            $folderName = $fileName[count($fileName) - 2];

            $zip->addFile($file, $folderName . '/' . end($fileName));
        }

        $zip->close();

        $response = new Response(file_get_contents($zipFileName));
        $response->headers->set('Content-Type', 'application/zip');
        $response->headers->set('Content-Disposition', 'attachment;filename="' . $zipFileName . '"');
        $response->headers->set('Content-length', filesize($zipFileName));

        @unlink($zipFileName);

        // Remove the files
        File::rmDir($kernel->getProjectDir() . '/tmp/' . $directory);

        return $response;
    }
}
