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

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      deliveries {
        list {
          card_text
          card_title
          event_ids
          id
          image
          page_title
          page_text
          page_title_image
          slug
          metadata_title
          metadata_description
        }
      }
    }
  `)
  data.deliveries.list.forEach(delivery => {
    const { slug, id } = delivery;
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/delivery.tsx`),
      context: { delivery },
    })
  })
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
