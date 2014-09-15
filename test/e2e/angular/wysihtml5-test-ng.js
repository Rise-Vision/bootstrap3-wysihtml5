(function() {
  "use strict";

  var chai = require("chai");
  var chaiAsPromised = require("chai-as-promised");
  var expect = chai.expect;

  chai.use(chaiAsPromised);
  browser.driver.manage().window().setSize(1024, 768);

  describe("WYSIHTML5 Editor", function() {
    beforeEach(function () {
      browser.get("/test/e2e/angular/wysihtml5-test-ng.html");
    });

    it("Should load clear button", function () {
      expect(element(by.css(".clear")).isPresent()).to.eventually.be.true;
    });

    it("Should load font styles", function () {
      expect(element(by.css(".emphasis .bold")).isPresent())
        .to.eventually.be.true;

      expect(element(by.css(".emphasis .italic")).isPresent())
        .to.eventually.be.true;

      expect(element(by.css(".emphasis .underline")).isPresent())
        .to.eventually.be.true;
    });

    it("Should load alignment", function () {
      expect(element(by.css(".btn-alignment .fa-align-left"))
        .isPresent()).to.eventually.be.true;

      expect(element(by.css(
        ".btn-alignment[data-wysihtml5-command-value='left']")).isPresent())
        .to.eventually.be.true;

      expect(element(by.css(".alignment .dropdown-menu")).isDisplayed())
        .to.eventually.be.false;
    });

    it("Should load font picker", function () {
      expect(element(by.css(".font-picker .bfh-selectbox"))
        .isPresent()).to.eventually.be.true;

      expect(element.all(by.css(".font-picker .bfh-selectbox ul li"))
        .count()).to.eventually.equal(48);

      expect(element(by.css(".font-picker .google-fonts"))
        .isPresent()).to.eventually.be.true;

      expect(element(by.css(".font-picker .custom-font"))
        .isPresent()).to.eventually.be.true;

      expect(element(by.css(".font-picker .google-fonts"))
        .isDisplayed()).to.eventually.be.false;

      expect(element(by.css(".font-picker .custom-font"))
        .isDisplayed()).to.eventually.be.false;
    });

    it("Should load font size picker", function () {
      expect(element(by.css(".font-size-picker .bfh-fontsizes"))
        .isPresent()).to.eventually.be.true;

      expect(element.all(by.css(".font-size-picker .bfh-fontsizes ul li"))
        .count()).to.eventually.equal(14);
    });

    it("Should load line height", function () {
      expect(element(by.css(".line-height")).isPresent()).to.eventually.be.true;

      expect(element.all(by.css(".line-height ul li")).count())
        .to.eventually.equal(4);
    });

    it("Should load text color picker", function () {
      expect(element(by.css(".text-color")).getCssValue("display")).
        to.eventually.equal("none");

      expect(element(by.css(".text-color-picker")).isPresent()).
        to.eventually.be.true;
    });

    it("Should load highlight color picker", function () {
      expect(element(by.css(".highlight-color")).getCssValue("display")).
        to.eventually.equal("none");

      expect(element(by.css(".highlight-color-picker")).isPresent()).
        to.eventually.be.true;
    });

    it("Should load background color picker", function () {
      expect(element(by.css(".background-color")).getCssValue("display")).
        to.eventually.equal("none");

      expect(element(by.css(".background-color-picker")).isPresent()).
        to.eventually.be.true;
    });
  });
})();
