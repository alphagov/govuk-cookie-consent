window.GOVUK = window.GOVUK || {}
window.GOVUK.Modules = window.GOVUK.Modules || {};

(function (Modules) {
  function CookieSettings ($module) {
    this.$module = $module
  }

  CookieSettings.prototype.init = function () {
    this.$module.submitSettingsForm = this.submitSettingsForm.bind(this)

    document.querySelector('form[data-module=cookie-settings]')
      .addEventListener('submit', this.$module.submitSettingsForm)

    this.setInitialFormValues()
  }

  CookieSettings.prototype.setInitialFormValues = function () {
    if (!window.GOVUK.cookie('cookies_policy')) {
      window.GOVUK.setDefaultConsentCookie()
    }

    var currentConsentCookie = window.GOVUK.cookie('cookies_policy')
    var currentConsentCookieJSON = JSON.parse(currentConsentCookie)

    if (!currentConsentCookie) return
    if (!currentConsentCookieJSON) return

    // Ignore Essential cookies, separate out other policy entries
    var { essential, usage, aggregate, ...settingsCampaignsCookies } = currentConsentCookieJSON;
    
    // Handle Settings and Campaigns
    Object.entries(settingsCampaignsCookies).forEach((type) => {
      var radio = document.querySelector(`input[name="cookies-${type[0]}"][value="${this.getCookiePolicyValue(settingsCampaignsCookies, type[0])}"]`);
      if (radio) {
        radio.checked = true;
      }
    })
    
    // Handle Usage policy separately
    var usagePolicy = { usage, aggregate };
    var usageRadio = document.querySelector(`input[name="cookies-usage"][value="${this.getUsageRadioValue(usagePolicy,)}"]`);
    if (usageRadio) {
      usageRadio.checked = true;
    }
  }

  CookieSettings.prototype.getUsageRadioValue = function(policy) {
    if (policy.aggregate) return 'aggregate'
    if (policy.usage) return 'on'
    return 'off'
  }

  CookieSettings.prototype.submitSettingsForm = function (event) {
    event.preventDefault()

    var formInputs = event.target.getElementsByTagName('input')
    var options = {}

    for (var i = 0; i < formInputs.length; i++) {
      var input = formInputs[i];

      if (input.checked) {
        var name = input.name.replace('cookies-', '');
        var val = input.value;

        // Handle "Campaigns" and "Settings"
        if (name === 'campaigns' || name === 'settings') {
          options[name] = (val === 'on');
        }

        // Handle "Usage" and "Aggregate"
        if (name === 'usage') {
          if (val === 'off') {
            options.usage = false;
            options.aggregate = false;
          } else if (val === 'on') {
            options.usage = true;
            options.aggregate = false;
          } else if (val === 'aggregate') {
            options.usage = false;
            options.aggregate = true;
          }
        }
      }
    }

    window.GOVUK.setConsentCookie(options)
    window.GOVUK.setCookie('cookies_preferences_set', true, { days: 365 })
    this.showConfirmationMessage()
    return false
  }

  CookieSettings.prototype.showConfirmationMessage = function () {
    var confirmationMessage = document.querySelector('div[data-cookie-confirmation]')
    // hide the message if already visible so assistive tech is triggered when it appears
    confirmationMessage.style.display = 'none'
    var previousPageLink = document.querySelector('.cookie-settings__prev-page')
    var referrer = CookieSettings.prototype.getReferrerLink()

    document.body.scrollTop = document.documentElement.scrollTop = 0

    if (previousPageLink) {
      if (referrer && referrer !== document.location.pathname) {
        previousPageLink.href = referrer
        previousPageLink.style.display = 'inline'
      } else {
        previousPageLink.style.display = 'none'
      }
    }

    confirmationMessage.style.display = 'block'
  }

  CookieSettings.prototype.getReferrerLink = function () {
    var documentReferrer = false
    try {
      documentReferrer = document.referrer || new URL(document.referrer).pathname
    } catch (e) {
      console.warn('Error grabbing referrer for cookie settings', window.location, e)
    }
    return documentReferrer
  }

  CookieSettings.prototype.getRadioButtonAndClick = function (event) {
  }

  CookieSettings.prototype.getCookiePolicyValue = function (policy, cookieType) {
    if (policy[cookieType] === true) {
      return 'on'
    }

    return 'off'
  }

  Modules.CookieSettings = CookieSettings
})(window.GOVUK.Modules)
