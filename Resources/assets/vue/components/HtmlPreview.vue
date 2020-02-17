<style lang="scss" scoped>
    .html-preview {
        margin: 0;
        min-height: 400px;
        overflow-y: auto;
        position: relative;

        .browser {
            border: 3px solid #f1f1f1;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            min-height: 400px;
            position: relative;
        }

        .toolbar {
            padding: 10px;
            background: #f1f1f1;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            position: relative;

            .column {
                float: left;
                position: relative;

                .dot {
                    margin-top: 4px;
                    height: 12px;
                    width: 12px;
                    background-color: #bbb;
                    border-radius: 50%;
                    display: inline-block;

                    &:first-child {
                        background-color: #ED594A;
                    }

                    &:nth-child(2) {
                        background-color: #FDD800;
                    }

                    &:last-child {
                        background-color: #5AC05A;
                    }
                }
            }

            .left {
                width: 55px;
            }

            .right {
                width: 25px;

                > div {
                    float: right;

                    .bar {
                        width: 17px;
                        height: 3px;
                        background-color: #aaa;
                        margin: 3px 0;
                        display: block;
                    }
                }
            }

            .middle {
                width: calc(100% - 80px);

                input[type=text] {
                    width: 100%;
                    border-radius: 3px;
                    border: none;
                    background-color: white;
                    margin-top: -8px;
                    height: 25px;
                    color: #666;
                    padding: 5px;
                }
            }

            &:after {
                content: "";
                display: table;
                clear: both;
            }
        }

        .content {
            min-height: 355px;
            overflow-y: auto;
            position: relative;

            iframe {
                width: 100%;
                min-height: 355px;
                border: 0;
                display: block;
            }
        }
    }
</style>

<template>
    <div class="html-preview">
        <div class="browser">
            <div class="toolbar">
                <div class="column left">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
                <div class="column middle">
                    <input type="text" class="browser-default" value="https://pronto.am">
                </div>
                <div class="column right">
                    <div>
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </div>
                </div>
            </div>

            <div class="content">
                <iframe :src="src"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            content: {
                type: String
            }
        },

        data() {
            return {
                src: 'data:text/html;charset=utf-8,' + escape(this.content),
            }
        },

        watch: {
            content: function () {
                this.updateContent();
            }
        },

        methods: {
            updateContent() {
                this.src = 'data:text/html;charset=utf-8,' + escape(this.content);
            }
        }
    }
</script>
