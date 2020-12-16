const fetch = require('node-fetch');
const algoliasearch = require('algoliasearch');

const client = algoliasearch('GENYJWQIK2', '3456DSFGkjhgjhrehsdj123');


const index = client.initIndex('e_commerce');

const indexData = async () => {
  /**
   * STEP 1 : get your data from internal endpoint
   */

  const productsResponse = await fetch(
    'https://api.my-internal-product-tool.com/products',
    {
      method: 'GET',
      headers: {
        Authorization: 'BearerddSH324Fqgsdhtr32FQy5465fdgqrgrg',
      },
    }
  );
  const products = await productsResponse.json();

  /**
   * STEP 2 (if needed) : transform your data
   */

  const transformedProducts = products.map(product => ({
    ...product,
    otherData: 'random',
    bool: true || false,
  }));

  /**
   * STEP 3 : Index you data in algolia
   */

  index
    .saveObjects(transformedProducts, {
      //... configuration options
      autoGenerateObjectIDIfNotExist: true,
    })
    .then(() => {
      console.log('Data indexed !');
    })
    .catch(err => {
      console.log('Error indexing the data: ', err);
    });
};

indexData();
