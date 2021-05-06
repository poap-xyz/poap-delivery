const fetch = require(`node-fetch`)

const apiHost = process.env.GATSBY_API_POAP;
const deliveriesUrl = (limit, offset) => `${apiHost}/deliveries?limit=${limit}&offset=${offset}`;

exports.sourceNodes = async ({
                               actions: {createNode},
                               createContentDigest,
                             }) => {
  const batchSize = 10;
  let limit = batchSize;
  let offset = 0;
  let allFetched = false;

  let deliveries = [];

  while (!allFetched) {
    const result = await fetch(deliveriesUrl(limit, offset));
    const resultData = await result.json();

    if (resultData.deliveries) {
      deliveries = [...deliveries, ...resultData.deliveries];
      if (limit < resultData.total) {
        offset += batchSize;
        limit += batchSize;
      } else {
        allFetched = true;
      }
    }
  }

  createNode({
    id: `imported-deliveries`,
    list: deliveries,
    parent: null,
    children: [],
    internal: {
      type: `Deliveries`,
      contentDigest: createContentDigest(deliveries),
    },
  });

}

exports.onCreateWebpackConfig = ({stage, loaders, actions}) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /ethers/,
            use: loaders.null(),
          },
          {
            test: /web3/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
