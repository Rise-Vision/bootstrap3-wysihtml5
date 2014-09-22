/* global angular, $ */

(function () {
  "use strict";

  angular.module("risevision.widget.common.wysihtml5", [])
    .directive("wysihtml5", function () {
      var editor = null;
      var $editable = $("#editable");
      var $fontStyle, $fontPicker, $fontSizePicker;
      var $textColor, $highlightColor, $backgroundColor;

      function link(scope, element) {
        $(element).wysihtml5({
          "stylesheets": scope.stylesheets
        });

        editor = $editable.data("wysihtml5").editor;
        $fontStyle = $(".emphasis");
        $fontPicker = $(".font-picker");
        $fontSizePicker = $(".font-size-picker");
        $textColor = $(".text-color");
        $highlightColor = $(".highlight-color");
        $backgroundColor = $(".background-color");

        bind();

        editor.setValue(scope.data);
      }

      function bind() {
        // Add event handlers.
        $(".font-picker").on("show.bfhselectbox", function() {
          closeDropdowns();
        });

        $(".font-size-picker, .line-height, .alignment").on("show.bs.dropdown", function() {
          closeDropdowns();
        });

        $(".text-color, .highlight-color, .background-color").on("beforeShow", function() {
          closeDropdowns();
        });

        // When the user clicks in the editor, set toolbar to match text styles.
        $(".wysihtml5-sandbox").contents().find("body").on("click", function() {
          var node = null, parentNode = null;
          var isBold = false, isItalic = false, isUnderline = false;
          var font = "", fontSize = "", lineHeight = "";
          var color = "", highlightColor = "";

          closeDropdowns();

          node = editor.composer.selection.getSelectedNode();

          if (node) {
            // This is a text node.
            if (node.nodeType === 3) {
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

                  $(".line-height button").data("wysihtml5-command-value", lineHeight);

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
          }
        });
      }

      // Close all open dropdowns.
      function closeDropdowns() {
        $(".open.alignment, .font-picker .open.bfh-selectbox, " +
          ".font-size-picker .open.bfh-fontsizes, .open.line-height").removeClass("open");
        $(".text-color").spectrum("hide");
        $(".highlight-color").spectrum("hide");
        $(".background-color").spectrum("hide");
      }

      return {
        restrict: "A",
        scope: {
          "stylesheets": "=",
          "data": "="
        },
        link: link
      };
    });
}());
