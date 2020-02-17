<?php

namespace Pronto\MobileBundle\Controller\Api\Vue;


use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Exception;
use Pronto\MobileBundle\Controller\Api\Vue\ApiController;
use Pronto\MobileBundle\Entity\Application\ApplicationPlugin;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Repository\Application\PluginRepository;
use Pronto\MobileBundle\Request\PluginRequest;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * Class PluginController
 * @package Pronto\MobileBundle\Controller\Api\Vue
 * @Route(path="plugins")
 * @IsGranted("ROLE_SUPER_ADMIN")
 */
class PluginController extends ApiController
{
    /**
     * @var PluginRepository $applicationPlugins
     */
    private $applicationPlugins;

    /**
     * PluginController constructor.
     * @param PluginRepository $applicationPlugins
     */
    public function __construct(PluginRepository $applicationPlugins)
    {
        $this->applicationPlugins = $applicationPlugins;
    }

    /**
     * @Route(path="", methods={"GET"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     */
    public function listAction()
    {
        $plugins = $this->applicationPlugins->findAllByApplication($this->prontoMobile->getApplication());
        return $this->response($plugins);
    }

    /**
     * @Route(path="/{id}", methods={"GET"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param int $id
     * @return JsonResponse
     * @throws NoResultException
     * @throws NonUniqueResultException
     * @throws NotFoundHttpException
     */
    public function getAction(int $id)
    {
        $plugin = $this->applicationPlugins->findByApplication($this->prontoMobile->getApplication(), $id);

        if ($plugin === null) {
            throw new NotFoundHttpException('No results found for model');
        }

        return $this->response($plugin);
    }

    /**
     * @Route(methods={"POST"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param PluginRequest $request
     * @return JsonResponse
     * @throws NoResultException
     * @throws NonUniqueResultException
     * @throws NotFoundHttpException
     */
    public function saveAction(PluginRequest $request)
    {
        $plugin = $this->applicationPlugins->findByApplication($this->prontoMobile->getApplication(), $request->get('plugin.id'));

        if ($plugin === null) {
            throw new NotFoundHttpException('No results found for model');
        }

        $content = $request->all();
        $plugin->setActive($request->get('active') === true);

        // Get the default config as a template for the fields that are required
        $config = $plugin->getDefaultConfig();

        foreach($config as $key => &$value) {
            switch($value['type']) {
                case 'checkbox':
                    $value = isset($content[$key]);
                    break;
                case 'json':
                    $value = json_decode($content[$key]);
                    break;
                default:
                    $value = $content[$key];
            }
        }

        // Save the config
        $plugin->setConfig($config);

        $this->applicationPlugins->save($plugin);

        return $this->response($plugin);
    }

    /**
     * @Route(path="/delete", methods={"POST"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @return JsonResponse
     */
    public function deleteAction()
    {
        return JsonResponse::create(['data' => []]);
    }
}
