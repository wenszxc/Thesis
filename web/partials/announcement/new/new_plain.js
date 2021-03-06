'use strict';

(function () {
    angular.module('myApp.announcement.new_plain', [])
            .config(['$stateProvider', function ($stateProvider) {
                    $stateProvider
                            .state('announcement.new_plain', {
                                url: "/new/plain",
                                controller: "NewPlainAnnouncementCtrl",
                                templateUrl: '/partials/announcement/new/new_plain.html',
                                data: {
                                    roles: ["ADMIN"]
                                }
                            });
                }])

            .controller('NewPlainAnnouncementCtrl', ["$scope", "$http", "$state", "$timeout", function ($scope, $http, $state, $timeout) {

                    $scope.priority = {
                        High: 1,
                        Normal: 2,
                        Low: 3,
                    };

                    $scope.togglePinnedVisibility = function () {
                        if ($scope.pinned) {
                            $("#pinnedContent").fadeIn(500);
                        } else {
                            $("#pinnedContent").fadeOut(500);
                        }
                    };

                    $scope.announcement = {
                        title: "",
                        content: "",
                        htmlContent: "",
                        pinnedContent: "",
                        priorityLvl: 2,
                    };
                    $scope.visible = true;
                    $scope.pinned = false;
                    $scope.togglePinnedVisibility();
                    $scope.visibleMsg = $scope.visible ? "Visible" : "Hidden";
                    $scope.changeMsg = function () {
                        $scope.visibleMsg = $scope.visible ? "Visible" : "Hidden";
                    };

                    var success = function (response) {
                        $('#spinner').fadeOut(100);
                        var valid = response.data.valid;
                        if (valid) {
                            $timeout(function () {
                                $state.go('announcement.browse');
                            }, 1000);
                        } else {
                            var errors = response.data.errors;
                            var fields = response.data.fields;
                            $('.invalid').removeClass('invalid');
                            $.each(fields, function (i, r) {
                                $("label[for='announcement." + r + "']").addClass('invalid');
                            });

                            $.each(errors, function (i, v) {
                                if (v != "") {
                                    var n = noty({
                                        text: v,
                                        type: 'error',
                                        layout: 'topRight',
                                        animation: {
                                            open: 'animated tada', // Animate.css class names
                                            close: 'animated bounceOut', // Animate.css class names
                                        },
                                        timeout: 10000
                                    });
                                }
                            });
                        }
                    };

                    var error = function (reason) {
                        $('#spinner').fadeOut(100);
                        var n = noty({
                            text: "Failed to create announcement",
                            type: 'error',
                            layout: 'topRight',
                            animation: {
                                open: 'animated tada', // Animate.css class names
                                close: 'animated bounceOut', // Animate.css class names
                            },
                            timeout: 10000
                        });
                    };

                    $scope.tinyConfig = {
                        selector: "textarea",
                        plugins: [
                            "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak spellchecker",
                            "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                            "table contextmenu directionality emoticons template textcolor paste textcolor colorpicker textpattern imagetools jbimages"
                        ],
                        toolbar1: "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
                        toolbar2: "cut copy paste | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink jbimages | insertdatetime preview | forecolor backcolor",
                        toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | ltr rtl | spellchecker | fullscreen  imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io']",
                        menubar: false,
                        toolbar_items_size: 'small',
                        relative_urls: false,
                        style_formats: [{
                                title: 'Bold text',
                                inline: 'b'
                            }, {
                                title: 'Red text',
                                inline: 'span',
                                styles: {
                                    color: '#ff0000'
                                }
                            }, {
                                title: 'Red header',
                                block: 'h1',
                                styles: {
                                    color: '#ff0000'
                                }
                            }, {
                                title: 'Example 1',
                                inline: 'span',
                                classes: 'example1'
                            }, {
                                title: 'Example 2',
                                inline: 'span',
                                classes: 'example2'
                            }, {
                                title: 'Table styles'
                            }, {
                                title: 'Table row 1',
                                selector: 'tr',
                                classes: 'tablerow1'
                            }],
                        templates: [{
                                title: 'Test template 1',
                                content: 'Test 1'
                            }, {
                                title: 'Test template 2',
                                content: 'Test 2'
                            }],
                    };



                    $scope.submit = function () {
                        $scope.announcement.content = tinymce.activeEditor.getContent({format: 'text'});

                        if ($scope.pinned && $scope.announcement.pinnedContent == "") {
                            var n = noty({
                                text: "You have pinned this announcement. Please enter the content to show in the ticker.",
                                type: 'error',
                                layout: 'topRight',
                                animation: {
                                    open: 'animated tada', // Animate.css class names
                                    close: 'animated bounceOut', // Animate.css class names
                                },
                                timeout: 10000
                            });
                        } else {
                            var formData = {
                                thesis_bulletinbundle_plainannouncement: $scope.announcement,
                                visible: $scope.visible,
                                pinned: $scope.pinned
                            };
                            $('#spinner').show();

                            $http.post(Routing.generate('announcement_plain_create'), $.param(formData), {
                                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                            })
                                    .then(success, error);
                        }


                    };


                }]);



}());


