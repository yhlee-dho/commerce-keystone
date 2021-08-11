import { PAGINATION_QUERY } from '../components/Pagination';
import ItemStyles from '../components/styles/ItemStyles';

export default function paginationField() {
  return {
    keyArgs: false, // this tells apollo we will take care of everything
    read(existing = [], { args, cache }) {
      // console.log({ existing, args, cache });
      const { skip, first } = args;

      // Read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      // console.log('----data here----');
      // console.log(data);
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // IF
      // there are items
      // And there aren't enough items to satisfy how many were requested //2
      // And we are on the last page
      // THEN JUST SEND IT
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // we dont have any items, we must go to the network to fetch them
        return false;
      }

      // If there are items, just return them from the cache, and we don't need to  go to the network
      if (items.length) {
        // console.log(
        //   `There are ${items.length} items in the cache! Gonna send them to apollo`
        // );
        return items;
      }
      return false; // fallback to network in case the if statements dont work out
      // First thing apollo query does is it asks the read function for those items
      // We can either do one of the two things:
      // 1. return the items because they are already in the cache
      // 2. Return false from here, (network request) and apollo will get data from keystone db.
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // This runs when the Apollo client comes back from the network(keystone) with the products
      // console.log(`Merging items from the network ${incoming.length}`);
      // console.log(incoming);
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      // console.log(merged);
      // finally we return the merged items from the cache,
      return merged;
    },
  };
}
