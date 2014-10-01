/* global RiseVision, angular, tinycolor, $ */

(function () {
  "use strict";

  angular.module("risevision.widget.common.wysihtml5", [])
    .directive("wysihtml5", function () {
      var editor = null;
      var $fontPicker, $backgroundColor;

      function link($scope, element) {
        var textColor, highlightColor;
        var standardFont, googleFont, customFont;

        $(element).wysihtml5({
          "stylesheets": $scope.stylesheets
        });

        $fontPicker = $(".font-picker");
        $backgroundColor = $(".background-color");
        editor = $("#editable").data("wysihtml5").editor;

        editor.on("load", function() {
          bind($scope);

          $.each($($scope.data).find("span").andSelf(), function() {
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
              editor.composer.commands.exec("textColor", textColor);
            }

            if (highlightColor) {
              editor.composer.commands.exec("highlightColor", highlightColor);
            }
          });
        });
      }

      function bind($scope) {
        var node = null, parentNode = null;
        var isBold = false, isItalic = false, isUnderline = false;
        var font = "", fontSize = "", lineHeight = "";
        var color = "", highlightColor = "", backgroundColor = null;
        var hexString = "", rgb = null;
        var $fontStyle, $fontSizePicker;
        var $textColor, $highlightColor;

        $fontStyle = $(".emphasis");
        $fontSizePicker = $(".font-size-picker");
        $textColor = $(".text-color");
        $highlightColor = $(".highlight-color");

        // Add event handlers.
        $scope.$on("collectAdditionalParams", function() {
          $scope.setAdditionalParam("data", editor.getValue());
          $scope.setAdditionalParam("background", editor.composer.doc.body.getAttribute("data-background-color"));
        });

        $scope.$on("loadAdditionalParams", function (e, additionalParams) {
          editor.setValue(additionalParams.data);

          // Set background color.
          if (additionalParams.background) {
            backgroundColor = tinycolor(additionalParams.background);
            hexString = backgroundColor.toHexString();
            rgb = backgroundColor.toRgb();

            $backgroundColor.spectrum("set", backgroundColor);
            editor.composer.commands.exec("backgroundColor", hexString, rgb, [{
              name: "data-background-color",
              value: backgroundColor.toRgbString()
            }]);
          }
        });

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
                // Reset font style.
                $fontStyle.data("plugin_fontStyle").setStyles({
                  "bold": false,
                  "italic": false,
                  "underline": false
                });

                // Reset line height.
                $(".line-height button").data("wysihtml5-command-value", 1);
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
