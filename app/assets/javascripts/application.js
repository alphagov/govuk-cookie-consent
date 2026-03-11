//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
   window.GOVUK.modules.start()

   const cookieBannerDeleteCookiesButton = document.querySelector('[data-module=js-delete-cookies]')
   if (cookieBannerDeleteCookiesButton) {
      cookieBannerDeleteCookiesButton.addEventListener('click', window.GOVUK.deleteAllCookies)
   }
})
