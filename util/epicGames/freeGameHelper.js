module.exports = {
  getGameURL: function (gameObject) {
    try {
      return `https://www.epicgames.com/store/en-US/product/${
        gameObject.productSlug ?? gameObject.catalogNs.mappings.filter(mapping => mapping.pageType == 'productHome')[0].pageSlug
      }`;
    } catch (e) {
      return 'https://www.epicgames.com/store/en-US/product/404';
    }
  },
};
