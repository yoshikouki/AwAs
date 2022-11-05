import Link from 'next/link';
import { FaPen } from "react-icons/fa";
import AssetsList from './AssetsList';

const Assets = () => {

  return (
    <div className="prose w-full max-w-4xl">
      <h1 className="px-4">Assets</h1>

      <AssetsList />

      <Link
        href="/assets/edit"
        prefetch={false}
        className="btn btn-circle btn-lg btn-primary fixed right-0 bottom-0 z-50 mb-20 mr-4 ml-4"
      >
        <FaPen className="text-2xl" />
      </Link>
    </div>
  );
};

export default Assets;
