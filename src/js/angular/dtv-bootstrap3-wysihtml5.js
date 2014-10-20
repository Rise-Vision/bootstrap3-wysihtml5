/* global RiseVision, angular, tinycolor, $ */

(function () {
  "use strict";

  angular.module("risevision.widget.common.wysihtml5", [])
    .directive("wysihtml5", function () {
      var editor = null;
      var $fontPicker, $backgroundColor, $textColor, $highlightColor;
      var isEditorLoaded = false, isParamsLoaded = false;
      var params;

      function link($scope, element) {
        var backgroundColor = null, rgba = null;

        $(element).wysihtml5({
          "stylesheets": $scope.stylesheets
        });

        $fontPicker = $(".font-picker");
        $backgroundColor = $(".background-color");
        $textColor = $(".text-color");
        $highlightColor = $(".highlight-color");
        editor = $("#editable").data("wysihtml5").editor;

        // Add event handlers.
        $scope.$on("loadAdditionalParams", function (e, additionalParams) {
          isParamsLoaded = true;
          params = additionalParams;

          editor.setValue(additionalParams.data);

          // Set background color.
          if (additionalParams.background) {
            backgroundColor = tinycolor(additionalParams.background);
            rgba = backgroundColor.toRgb();

            $backgroundColor.spectrum("set", backgroundColor);

            editor.composer.commands.exec("backgroundColor", rgba, [{
                name: "data-background-color",
                value: backgroundColor.toRgbString()
              }]);
          }

          initEditor();
        });

        $scope.$on("collectAdditionalParams", function() {
          backgroundColor = editor.composer.doc.body
            .getAttribute("data-background-color");

          $scope.$parent.setAdditionalParam("data", editor.getValue());
          $scope.$parent.setAdditionalParam("background",
            backgroundColor ? backgroundColor : "");
        });

        editor.on("load", function() {
          isEditorLoaded = true;
          bind();
          initEditor();
        });
      }

      function initEditor() {
        var textColor, highlightColor;
        var standardFont, googleFont, customFont;

        if (isEditorLoaded && isParamsLoaded) {
          $.each($("<div/>").html(params.data).find("span").addBack(), function() {
            standardFont = $(this).attr("data-standard-font");
            googleFont = $(this).attr("data-google-font");
            customFont = $(this).attr("data-custom-font");
            textColor = $(this).attr("data-text-color");
            highlightColor = $(this).attr("data-highlight-color");

            // Add CSS for standard fonts.
            if (standardFont) {
              editor.composer.commands.exec("standardFont", standardFont,
                $(this).attr("data-standard-font-family"));
            }

            // Load and add CSS for Google fonts.
            if (googleFont) {
              $fontPicker.data("plugin_fontPicker")
                .addGoogleFont(googleFont, false);

              // This won't add a new span tag because a range will not have
              // been selected, which is what we want.
              editor.composer.commands.exec("googleFont", googleFont);
            }

            // Load and add CSS for custom fonts.
            if (customFont) {
              RiseVision.Common.Utilities.loadCustomFont(customFont,
                $(this).attr("data-custom-font-url"),
                editor.composer.iframe.contentDocument);
              editor.composer.commands.exec("customFont", customFont,
                $(this).attr("data-custom-font-url"));
            }

            // Add CSS for colors.
            if (textColor) {
              // Use color picker as an intermediary to get the color as an
              // object for passing to the editor command.
              $textColor.spectrum("set", textColor);
              editor.composer.commands.exec("textColor",
                $textColor.spectrum("get").toRgb());
            }

            if (highlightColor) {
              // Use color picker as an intermediary.
              $highlightColor.spectrum("set", highlightColor);
              editor.composer.commands.exec("highlightColor",
                $highlightColor.spectrum("get").toRgb());
            }
          });
        }
      }

      function bind() {
        var node = null, parentNode = null;
        var isBold = false, isItalic = false, isUnderline = false;
        var font = "", fontSize = "", alignment = "", lineHeight = "";
        var color = "", highlightColor = "";
        var $fontStyle = $(".emphasis")
        var $fontSizePicker = $(".font-size-picker");
        var $alignment = $(".alignment");

        // Add event handlers to toolbar and editor.
        $(".font-picker").on("show.bfhselectbox", function() {
          closeDropdowns();
        });

        $(".font-size-picker, .line-height, .alignment").on("show.bs.dropdown",
          function() {
            closeDropdowns();
          }
        );

        $(".text-color, .highlight-color, .background-color")
          .on("beforeShow", function() {
            closeDropdowns();
          }
        );

        // When the user clicks in the editor, set toolbar to match text styles.
        $(".wysihtml5-sandbox").contents().find("body").on("click", function() {
          closeDropdowns();

          node = editor.composer.selection.getSelectedNode();

          // The selected node is a text node.
          if (node && node.nodeType === 3) {
            parentNode = node.parentNode;

            // The parent node is an element.
            if (parentNode && parentNode.nodeType === 1) {
              // The parent node is not the editor element itself.
              if (parentNode.tagName.toLowerCase() !== "body") {
                // Font Style
                isBold = window.getComputedStyle(parentNode, null)
                  .getPropertyValue("font-weight") === "bold" ? true : false;
                isItalic = window.getComputedStyle(parentNode, null)
                  .getPropertyValue("font-style") === "italic" ? true : false;
                isUnderline = window.getComputedStyle(parentNode, null)
                  .getPropertyValue("text-decoration").indexOf("underline") !== -1 ? true : false;

                $fontStyle.data("plugin_fontStyle").setStyles({
                  "bold": isBold,
                  "italic": isItalic,
                  "underline": isUnderline
                });

                // Font
                font = window.getComputedStyle(parentNode, null)
                  .getPropertyValue("font-family");

                if (font) {
                  $fontPicker.data("plugin_fontPicker").setFont(font);
                }

                // Font size
                fontSize = window.getComputedStyle(parentNode, null)
                  .getPropertyValue("font-size");

                if (fontSize) {
                  $fontSizePicker.data("plugin_fontSizePicker")
                    .setFontSize(fontSize);
                }

                // Alignment
                alignment = window.getComputedStyle(parentNode, null)
                  .getPropertyValue("text-align");

                if (alignment) {
                  $alignment.data("plugin_alignment")
                    .setAlignment(alignment);
                }

                // Line Height
                lineHeight = $(parentNode).data("line-height") ?
                  $(parentNode).data("line-height") : 1;

                $(".line-height button").data("wysihtml5-command-value",
                  lineHeight);

                // Colors
                color = window.getComputedStyle(parentNode, null)
                  .getPropertyValue("color");
                highlightColor = window.getComputedStyle(parentNode, null)
                  .getPropertyValue("background-color");

                if (color) {
                  $textColor.spectrum("set", color);
                }

                if (highlightColor) {
                  $highlightColor.spectrum("set", highlightColor);
                }
              }
              else {
                // Reset all toolbar icons.
                $fontPicker.data("plugin_fontPicker").reset();
                $fontSizePicker.data("plugin_fontSizePicker").reset();
                $fontStyle.data("plugin_fontStyle").reset();
                $alignment.data("plugin_alignment").reset();
                $(".line-height a[data-wysihtml5-command-value='1']")
                  .trigger("click");

                $textColor.spectrum("set", "#000");
                $highlightColor.spectrum("set", "#fff");
              }
            }
          }
        });
      }

      // Close all open dropdowns.
      function closeDropdowns() {
        $(".open.alignment, .font-picker .open.bfh-selectbox, " +
          ".font-size-picker .open.bfh-fontsizes, .open.line-height")
          .removeClass("open");
        $(".text-color").spectrum("hide");
        $(".highlight-color").spectrum("hide");
        $(".background-color").spectrum("hide");
      }

      return {
        restrict: "A",
        scope: {
          "stylesheets": "=",
          "background": "=",
          "data": "="
        },
        link: link
      };
    });
}());
