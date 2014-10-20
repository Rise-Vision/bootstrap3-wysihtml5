!function($, wysi) {
    "use strict";

    var tpl = {
        /* Donna Start */
        "alignment": function(locale, options) {
          return "<li>" +
            "<div class='alignment'></div>" +
          "</li>";
        },
        "font": function(locale, options) {
          return "<li>" +
            "<div class='font-picker'></div>" +
          "</li>";
        },
        "font-size": function(locale, options) {
          return "<li>" +
            "<div class='font-size-picker'></div>" +
          "</li>";
        },
        "line-height": function(locale, options) {
          return "<li>" +
            "<div class='line-height btn-group'>" +
              "<button type='button' class='btn btn-default btn-sm dropdown-toggle'" +
                "data-toggle='dropdown' data-wysihtml5-command-value='1'>" +
                "<i class='glyphicon glyphicon-text-height'></i>" +
                "<span class='caret'></span>" +
              "</button>" +
              "<ul class='dropdown-menu' role='menu'>" +
                "<li>" +
                  "<a data-wysihtml5-command-value='1' tabindex='-1'>" + locale.line_height.single + "</a>" +
                "</li>" +
                "<li>" +
                  "<a data-wysihtml5-command-value='1-15' tabindex='-1'>1.15</a>" +
                "</li>" +
                "<li>" +
                  "<a data-wysihtml5-command-value='1-5' tabindex='-1'>1.5</a>" +
                "</li>" +
                "<li>" +
                  "<a data-wysihtml5-command-value='2' tabindex='-1'>" + locale.line_height.double + "</a>" +
                "</li>" +
              "</ul>" +
            "</div>" +
          "</li>";
        },
        "text-color": function(locale, options) {
           return "<li>" +
            "<input class='text-color' type='color'>" +
          "</li>";
        },
        "highlight-color": function(locale, options) {
           return "<li>" +
            "<input class='highlight-color' type='color'>" +
          "</li>";
        },
        "background-color": function(locale, options) {
           return "<li>" +
            "<input class='background-color' type='color'>" +
          "</li>";
        },
        "clear": function(locale, options) {
          return "<li>" +
            "<a class='clear btn btn-sm btn-default' data-wysihtml5-command='clear' title='Clear' tabindex='-1'>" +
              "<span class='glyphicon glyphicon-file'></span>" +
            "</a>" +
          "</li>";
        },
        /* Donna End */
        "font-styles": function(locale, options) {
            var size = (options && options.size) ? " btn-" + options.size : "";
            return "<li class='dropdown'>" +
                "<a class='btn dropdown-toggle " + size + " btn-default' data-toggle='dropdown' href='#'>" +
                "<i class='glyphicon glyphicon-font'></i>&nbsp;<span class='current-font'>" + locale.font_styles.normal + "</span>&nbsp;<b class='caret'></b>" +
                "</a>" +
                "<ul class='dropdown-menu' role='menu'>" +
                "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='div' tabindex='-1'>" + locale.font_styles.normal + "</a></li>" +
                "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h1' tabindex='-1'>" + locale.font_styles.h1 + "</a></li>" +
                "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h2' tabindex='-1'>" + locale.font_styles.h2 + "</a></li>" +
                "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h3' tabindex='-1'>" + locale.font_styles.h3 + "</a></li>" +
                "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h4'>" + locale.font_styles.h4 + "</a></li>" +
                "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h5'>" + locale.font_styles.h5 + "</a></li>" +
                "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h6'>" + locale.font_styles.h6 + "</a></li>" +
                "</ul>" +
                "</li>";
        },

        /* Donna Start - Use font-style component. */
        "emphasis": function(locale, options) {
          return "<li>" +
            "<div class='emphasis'><div>" +
          "</li>";
        },
        /* Donna End */

        "lists": function(locale, options) {
            var size = (options && options.size) ? ' btn-'+options.size : '';
            return "<li>" +
                "<div class='btn-group'>" +
                "<a class='btn " + size + " btn-default' data-wysihtml5-command='insertUnorderedList' title='" + locale.lists.unordered + "' tabindex='-1'><i class='glyphicon glyphicon-list'></i></a>" +
                "<a class='btn " + size + " btn-default' data-wysihtml5-command='insertOrderedList' title='" + locale.lists.ordered + "' tabindex='-1'><i class='glyphicon glyphicon-th-list'></i></a>" +
                "<a class='btn " + size + " btn-default' data-wysihtml5-command='Outdent' title='" + locale.lists.outdent + "' tabindex='-1'><i class='glyphicon glyphicon-indent-right'></i></a>" +
                "<a class='btn -" + size + " btn-default' data-wysihtml5-command='Indent' title='" + locale.lists.indent + "' tabindex='-1'><i class='glyphicon glyphicon-indent-left'></i></a>" +
                "</div>" +
                "</li>";
        },

        "link": function(locale, options) {
            var size = (options && options.size) ? ' btn-'+options.size : '';
            return "<li>" +
                ""+
                "<div class='bootstrap-wysihtml5-insert-link-modal modal fade'>" +
                "<div class='modal-dialog'>"+
                "<div class='modal-content'>"+
                "<div class='modal-header'>" +
                "<a class='close' data-dismiss='modal'>&times;</a>" +
                "<h4>" + locale.link.insert + "</h4>" +
                "</div>" +
                "<div class='modal-body'>" +
                "<input value='http://' class='bootstrap-wysihtml5-insert-link-url form-control'>" +
                "<label class='checkbox'> <input type='checkbox' class='bootstrap-wysihtml5-insert-link-target' checked>" + locale.link.target + "</label>" +
                "</div>" +
                "<div class='modal-footer'>" +
                "<button class='btn btn-default' data-dismiss='modal'>" + locale.link.cancel + "</button>" +
                "<button href='#' class='btn btn-primary' data-dismiss='modal'>" + locale.link.insert + "</button>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<a class='btn " + size + " btn-default' data-wysihtml5-command='createLink' title='" + locale.link.insert + "' tabindex='-1'><i class='glyphicon glyphicon-share'></i></a>" +
                "</li>";
        },

        "image": function(locale, options) {
            var size = (options && options.size) ? ' btn-'+options.size : '';
            return "<li>" +
                "<div class='bootstrap-wysihtml5-insert-image-modal modal fade'>" +
                "<div class='modal-dialog'>"+
                "<div class='modal-content'>"+
                "<div class='modal-header'>" +
                "<a class='close' data-dismiss='modal'>&times;</a>" +
                "<h4>" + locale.image.insert + "</h4>" +
                "</div>" +
                "<div class='modal-body'>" +
                "<input value='http://' class='bootstrap-wysihtml5-insert-image-url form-control'>" +
                "</div>" +
                "<div class='modal-footer'>" +
                "<button class='btn btn-default' data-dismiss='modal'>" + locale.image.cancel + "</button>" +
                "<button class='btn btn-primary' data-dismiss='modal'>" + locale.image.insert + "</button>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<a class='btn " + size + " btn-default' data-wysihtml5-command='insertImage' title='" + locale.image.insert + "' tabindex='-1'><i class='glyphicon glyphicon-picture'></i></a>" +
                "</li>";
        },

        "html": function(locale, options) {
            var size = (options && options.size) ? ' btn-'+options.size : '';
            return "<li>" +
                "<div class='btn-group'>" +
                "<a class='btn " + size + " btn-default' data-wysihtml5-action='change_view' title='" + locale.html.edit + "' tabindex='-1'><i class='glyphicon glyphicon-pencil'></i></a>" +
                "</div>" +
                "</li>";
        },

        "color": function(locale, options) {
            var size = (options && options.size) ? ' btn-'+options.size : '';
            return "<li class='dropdown'>" +
                "<a class='btn dropdown-toggle " + size + " btn-default' data-toggle='dropdown' href='#' tabindex='-1'>" +
                "<span class='current-color'>" + locale.colours.black + "</span>&nbsp;<b class='caret'></b>" +
                "</a>" +
                "<ul class='dropdown-menu'>" +
                "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='black'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='black'>" + locale.colours.black + "</a></li>" +
                "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='silver'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='silver'>" + locale.colours.silver + "</a></li>" +
                "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='gray'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='gray'>" + locale.colours.gray + "</a></li>" +
                "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='maroon'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='maroon'>" + locale.colours.maroon + "</a></li>" +
                "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='red'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='red'>" + locale.colours.red + "</a></li>" +
                "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='purple'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='purple'>" + locale.colours.purple + "</a></li>" +
                "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='green'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='green'>" + locale.colours.green + "</a></li>" +
                "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='olive'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='olive'>" + locale.colours.olive + "</a></li>" +
                "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='navy'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='navy'>" + locale.colours.navy + "</a></li>" +
                "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='blue'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='blue'>" + locale.colours.blue + "</a></li>" +
                "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='orange'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='orange'>" + locale.colours.orange + "</a></li>" +
                "</ul>" +
                "</li>";
        }
    };

    var templates = function(key, locale, options) {
        return tpl[key](locale, options);
    };


    var Wysihtml5 = function(el, options) {
        this.el = el;
        var toolbarOpts = options || defaultOptions;
        for(var t in toolbarOpts.customTemplates) {
            tpl[t] = toolbarOpts.customTemplates[t];
        }
        this.toolbar = this.createToolbar(el, toolbarOpts);
        this.editor =  this.createEditor(options);

        window.editor = this.editor;

        $(window).trigger("editorLoaded");

        $('iframe.wysihtml5-sandbox').each(function(i, el){
            $(el.contentWindow).off('focus.wysihtml5').on({
                'focus.wysihtml5' : function(){
                    $('li.dropdown').removeClass('open');
                }
            });
        });
    };

    Wysihtml5.prototype = {

        constructor: Wysihtml5,

        createEditor: function(options) {
            options = options || {};

            // Add the toolbar to a clone of the options object so multiple instances
            // of the WYISYWG don't break because "toolbar" is already defined
            options = $.extend(true, {}, options);
            options.toolbar = this.toolbar[0];

            var editor = new wysi.Editor(this.el[0], options);

            if(options && options.events) {
                for(var eventName in options.events) {
                    editor.on(eventName, options.events[eventName]);
                }
            }
            return editor;
        },

        createToolbar: function(el, options) {
            var self = this;
            var toolbar = $("<ul/>", {
                'class' : "wysihtml5-toolbar",
                'style': "display:none"
            });
            var culture = options.locale || defaultOptions.locale || "en";
            for(var key in defaultOptions) {
                var value = false;

                if(options[key] !== undefined) {
                    if(options[key] === true) {
                        value = true;
                    }
                } else {
                    value = defaultOptions[key];
                }

                if(value === true) {
                    toolbar.append(templates(key, locale[culture], options));

                    if(key === "html") {
                        this.initHtml(toolbar);
                    }

                    if(key === "link") {
                        this.initInsertLink(toolbar);
                    }

                    if(key === "image") {
                        this.initInsertImage(toolbar);
                    }

                    /* Donna Start */
                    if (key === "alignment") {
                      this.initAlignment(toolbar);
                    }

                    if (key === "clear") {
                      this.initClear(toolbar);
                    }

                    if (key === "font") {
                        this.initFont(toolbar);
                    }

                    if (key === "font-size") {
                        this.initFontSize(toolbar);
                    }

                    if (key === "emphasis") {
                        this.initEmphasis(toolbar);
                    }

                    if (key === "text-color") {
                        this.initColorPicker(toolbar, {
                          elem: '.text-color',
                          type: 'text',
                          color: '#000',
                          command: 'textColor',
                          attribute: 'data-text-color'
                        });
                    }

                    if (key === "highlight-color") {
                        this.initColorPicker(toolbar, {
                          elem: '.highlight-color',
                          type: 'highlight',
                          color: '#fff',
                          command: 'highlightColor',
                          attribute: 'data-highlight-color'
                        });
                    }

                    if (key === "background-color") {
                        this.initColorPicker(toolbar, {
                          elem: '.background-color',
                          type: 'background',
                          color: '#fff',
                          command: 'backgroundColor',
                          attribute: 'data-background-color'
                        });
                    }
                    /* Donna End */
                }
            }

            if(options.toolbar) {
                for(key in options.toolbar) {
                    toolbar.append(options.toolbar[key]);
                }
            }

            toolbar.find("a[data-wysihtml5-command='formatBlock']").click(function(e) {
                var target = e.target || e.srcElement;
                var el = $(target);
                self.toolbar.find('.current-font').text(el.html());
            });

            toolbar.find("a[data-wysihtml5-command='foreColor']").click(function(e) {
                var target = e.target || e.srcElement;
                var el = $(target);
                self.toolbar.find('.current-color').text(el.html());
            });

            /* Donna Start - Add click event handler for line height. */
            toolbar.find(".line-height").on("shown.bs.dropdown", function(e) {
              var el = $(e.target);
              var lineHeight = el.find("button").data("wysihtml5-command-value");

              // Use short timeout to overcome issue with Bootstrap interfering with this handler.
              setTimeout(function() {
                el.find("a[data-wysihtml5-command-value='" + lineHeight + "']").focus();
              }, 0);
            });

            // Add click event handler for selecting an individual line height.
            toolbar.find(".line-height a").click(function(e) {
              var target = e.target || e.srcElement;
              var el = $(target);
              var lineHeight = el.data("wysihtml5-command-value");

              toolbar.find(".line-height button").data("wysihtml5-command-value", lineHeight);

              self.editor.composer.commands.exec("lineHeight", lineHeight, [{
                name: "data-line-height",
                value: lineHeight
              }]);
            });
            /* Donna End */

            this.el.before(toolbar);

            return toolbar;
        },

        initHtml: function(toolbar) {
            var changeViewSelector = "a[data-wysihtml5-action='change_view']";
            toolbar.find(changeViewSelector).click(function(e) {
                toolbar.find('a.btn').not(changeViewSelector).toggleClass('disabled');
            });
        },

        initInsertImage: function(toolbar) {
            var self = this;
            var insertImageModal = toolbar.find('.bootstrap-wysihtml5-insert-image-modal');
            var urlInput = insertImageModal.find('.bootstrap-wysihtml5-insert-image-url');
            var insertButton = insertImageModal.find('.btn-primary');
            var initialValue = urlInput.val();
            var caretBookmark;

            var insertImage = function() {
                var url = urlInput.val();
                urlInput.val(initialValue);
                self.editor.currentView.element.focus();
                if (caretBookmark) {
                    self.editor.composer.selection.setBookmark(caretBookmark);
                    caretBookmark = null;
                }
                self.editor.composer.commands.exec("insertImage", url);
            };

            urlInput.keypress(function(e) {
                if(e.which == 13) {
                    insertImage();
                    insertImageModal.modal('hide');
                }
            });

            insertButton.click(insertImage);

            insertImageModal.on('shown', function() {
                urlInput.focus();
            });

            insertImageModal.on('hide', function() {
                self.editor.currentView.element.focus();
            });

            toolbar.find('a[data-wysihtml5-command=insertImage]').click(function() {
                var activeButton = $(this).hasClass("wysihtml5-command-active");

                if (!activeButton) {
                    self.editor.currentView.element.focus(false);
                    caretBookmark = self.editor.composer.selection.getBookmark();
                    insertImageModal.appendTo('body').modal('show');
                    insertImageModal.on('click.dismiss.modal', '[data-dismiss="modal"]', function(e) {
                        e.stopPropagation();
                    });
                    return false;
                }
                else {
                    return true;
                }
            });
        },

        initInsertLink: function(toolbar) {
            var self = this;
            var insertLinkModal = toolbar.find('.bootstrap-wysihtml5-insert-link-modal');
            var urlInput = insertLinkModal.find('.bootstrap-wysihtml5-insert-link-url');
            var targetInput = insertLinkModal.find('.bootstrap-wysihtml5-insert-link-target');
            var insertButton = insertLinkModal.find('.btn-primary');
            var initialValue = urlInput.val();
            var caretBookmark;

            var insertLink = function() {
                var url = urlInput.val();
                urlInput.val(initialValue);
                self.editor.currentView.element.focus();
                if (caretBookmark) {
                    self.editor.composer.selection.setBookmark(caretBookmark);
                    caretBookmark = null;
                }

                var newWindow = targetInput.prop("checked");
                self.editor.composer.commands.exec("createLink", {
                    'href' : url,
                    'target' : (newWindow ? '_blank' : '_self'),
                    'rel' : (newWindow ? 'nofollow' : '')
                });
            };
            var pressedEnter = false;

            urlInput.keypress(function(e) {
                if(e.which == 13) {
                    insertLink();
                    insertLinkModal.modal('hide');
                }
            });

            insertButton.click(insertLink);

            insertLinkModal.on('shown', function() {
                urlInput.focus();
            });

            insertLinkModal.on('hide', function() {
                self.editor.currentView.element.focus();
            });

            toolbar.find('a[data-wysihtml5-command=createLink]').click(function() {
                var activeButton = $(this).hasClass("wysihtml5-command-active");

                if (!activeButton) {
                    self.editor.currentView.element.focus(false);
                    caretBookmark = self.editor.composer.selection.getBookmark();
                    insertLinkModal.appendTo('body').modal('show');
                    insertLinkModal.on('click.dismiss.modal', '[data-dismiss="modal"]', function(e) {
                        e.stopPropagation();
                    });
                    return false;
                }
                else {
                    return true;
                }
            });
        },

        /* Donna Start */
        initAlignment: function(toolbar) {
          toolbar.find(".alignment").alignment();
        },

        // Reset all toolbar icons.
        initClear: function(toolbar) {
          toolbar.find(".clear").on("click", function() {
            var backgroundColor = tinycolor("#fff");
            var rgba = backgroundColor.toRgb();

            toolbar.find(".font-picker").data("plugin_fontPicker")
              .reset();
            toolbar.find(".font-size-picker").data("plugin_fontSizePicker")
              .reset();
            toolbar.find(".emphasis").data("plugin_fontStyle")
              .reset();
            toolbar.find(".alignment").data("plugin_alignment")
              .reset();
            toolbar.find(".line-height a[data-wysihtml5-command-value='1']")
              .trigger("click");

            toolbar.find(".text-color").spectrum("set", "#000");
            toolbar.find(".highlight-color").spectrum("set", "#fff");
            toolbar.find(".background-color").spectrum("set", "#fff");

            self.editor.composer.commands.exec("backgroundColor", rgba, [{
              name: "data-background-color",
              value: backgroundColor.toRgbString()
            }]);
          });
        },

        initFont: function(toolbar) {
          // Pass content document after the editor has loaded.
          $(window).on("editorLoaded", function() {
            toolbar.find(".font-picker").data("plugin_fontPicker")
              .setContentDoc(self.editor.composer.iframe.contentDocument);
          });

          toolbar.find(".font-picker").fontPicker({})
            .on("standardFontSelected", function(e, font, fontFamily) {
              self.editor.composer.commands.exec("standardFont", font, fontFamily, [{
                name: "data-standard-font",
                value: font
              },
              {
                name: "data-standard-font-family",
                value: fontFamily
              }
              ]);

              self.editor.focus();
            })
            .on("googleFontSelected", function(e, font) {
              self.editor.composer.commands.exec("googleFont", font, [{
                name: "data-google-font",
                value: font
              }]);

              self.editor.focus();
            })
            .on("customFontSelected", function(e, font, fontURL) {
              self.editor.composer.commands.exec("customFont", font, [{
                name: "data-custom-font",
                value: font
              },
              {
                name: "data-custom-font-url",
                value: fontURL
              }]);

              self.editor.focus();
            });
        },

        initFontSize: function(toolbar) {
          toolbar.find(".font-size-picker").fontSizePicker()
            .on("sizeChanged", function(e, size) {
              self.editor.composer.commands.exec("fontSize", size);
              self.editor.focus();
            });
        },

        initEmphasis: function(toolbar) {
          toolbar.find(".emphasis").fontStyle();
        },

        initColorPicker: function(toolbar, options) {
          toolbar.find(options.elem).spectrum({
            cancelText: "Cancel",
            chooseText: "Apply",
            clickoutFiresChange: true,
            color: options.color,
            preferredFormat: "hex",
            showAlpha: true,
            showInput: true,
            type: options.type,
            change: function(color) {
              var rgba = color.toRgb();

              self.editor.composer.commands.exec(options.command, rgba, [{
                name: options.attribute,
                value: color.toRgbString()
              }]);

              self.editor.focus();
            },
          });
        },
        /* Donna End */
    };

    // these define our public api
    var methods = {
        resetDefaults: function() {
            $.fn.wysihtml5.defaultOptions = $.extend(true, {}, $.fn.wysihtml5.defaultOptionsCache);
        },
        bypassDefaults: function(options) {
            return this.each(function () {
                var $this = $(this);
                $this.data('wysihtml5', new Wysihtml5($this, options));
            });
        },
        shallowExtend: function (options) {
            var settings = $.extend({}, $.fn.wysihtml5.defaultOptions, options || {}, $(this).data());
            var that = this;
            return methods.bypassDefaults.apply(that, [settings]);
        },
        deepExtend: function(options) {
            var settings = $.extend(true, {}, $.fn.wysihtml5.defaultOptions, options || {});
            var that = this;
            return methods.bypassDefaults.apply(that, [settings]);
        },
        init: function(options) {
            var that = this;
            return methods.shallowExtend.apply(that, [options]);
        }
    };

    $.fn.wysihtml5 = function ( method ) {
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.wysihtml5' );
        }
    };

    $.fn.wysihtml5.Constructor = Wysihtml5;

    var defaultOptions = $.fn.wysihtml5.defaultOptions = {
        /* Donna Start - Defines order of toolbar icons. */
        "font": true,
        "font-size": true,
        "emphasis": true,
        "alignment": true,
        "line-height": true,
        "highlight-color": true,
        "text-color": true,
        "background-color": true,
        "clear": true,
        "color": false,
        "font-styles": false,
        "html": false,
        "image": false,
        "link": false,
        "lists": false,
        "size": 'sm',
        /* Donna End */
        events: {},
        parserRules: {
            classes: {
                // (path_to_project/lib/css/bootstrap3-wysiwyg5-color.css)
                "wysiwyg-color-silver" : 1,
                "wysiwyg-color-gray" : 1,
                "wysiwyg-color-white" : 1,
                "wysiwyg-color-maroon" : 1,
                "wysiwyg-color-red" : 1,
                "wysiwyg-color-purple" : 1,
                "wysiwyg-color-fuchsia" : 1,
                "wysiwyg-color-green" : 1,
                "wysiwyg-color-lime" : 1,
                "wysiwyg-color-olive" : 1,
                "wysiwyg-color-yellow" : 1,
                "wysiwyg-color-navy" : 1,
                "wysiwyg-color-blue" : 1,
                "wysiwyg-color-teal" : 1,
                "wysiwyg-color-aqua" : 1,
                "wysiwyg-color-orange" : 1,
                /* Donna Start - Alignment */
                "align-left" : 1,
                "align-center" : 1,
                "align-right" : 1,
                "justify" : 1,
                /* Donna End */
            },
            tags: {
                "b":  {},
                "i":  {},
                "br": {},
                "ol": {},
                "ul": {},
                "li": {},
                "h1": {},
                "h2": {},
                "h3": {},
                "h4": {},
                "h5": {},
                "h6": {},
                "blockquote": {},
                "u": 1,
                "img": {
                    "check_attributes": {
                        "width": "numbers",
                        "alt": "alt",
                        "src": "url",
                        "height": "numbers"
                    }
                },
                "a":  {
                    check_attributes: {
                        'href': "url", // important to avoid XSS
                        'target': 'alt',
                        'rel': 'alt'
                    }
                },
                "span": 1,
                "div": 1,
                // to allow save and edit files with code tag hacks
                "code": 1,
                "pre": 1
            }
        },
        stylesheets: ["./css/bootstrap3-wysiwyg5-color.css"], // (path_to_project/lib/css/bootstrap3-wysiwyg5-color.css)
        locale: "en"
    };

    if (typeof $.fn.wysihtml5.defaultOptionsCache === 'undefined') {
        $.fn.wysihtml5.defaultOptionsCache = $.extend(true, {}, $.fn.wysihtml5.defaultOptions);
    }

    var locale = $.fn.wysihtml5.locale = {
        en: {
            font_styles: {
                normal: "Normal text",
                h1: "Heading 1",
                h2: "Heading 2",
                h3: "Heading 3",
                h4: "Heading 4",
                h5: "Heading 5",
                h6: "Heading 6"
            },
            emphasis: {
                bold: "Bold",
                italic: "Italic",
                underline: "Underline"
            },
            lists: {
                unordered: "Unordered list",
                ordered: "Ordered list",
                outdent: "Outdent",
                indent: "Indent"
            },
            link: {
                insert: "Insert link",
                cancel: "Cancel",
                target: "Open link in new window"
            },
            image: {
                insert: "Insert image",
                cancel: "Cancel"
            },
            html: {
                edit: "Edit HTML"
            },
            colours: {
                black: "Black",
                silver: "Silver",
                gray: "Grey",
                maroon: "Maroon",
                red: "Red",
                purple: "Purple",
                green: "Green",
                olive: "Olive",
                navy: "Navy",
                blue: "Blue",
                orange: "Orange"
            },
            /* Donna Start */
            line_height: {
                single: "Single",
                double: "Double"
            }
            /* Donna End */
        }
    };

}(window.jQuery, window.wysihtml5);
