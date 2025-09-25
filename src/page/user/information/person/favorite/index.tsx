import {Favoriteorder,NewsFavoriteorder} from '../../../../../type/person_center/index'
import NewFavorite from './new_faorite';
import ProductFavorite from './product_favoirte';
interface MainFavoriteProps {
  favoriteList: Favoriteorder[];
  newsFavoriteList: NewsFavoriteorder[];
  showid: number;
}

const MainFavorite = ({ favoriteList, newsFavoriteList, showid }: MainFavoriteProps) => {
  const show = () => {
    switch (showid) {
      case 1:
        return <ProductFavorite favoriteList={favoriteList} />;
      case 3:
        return <NewFavorite newsFavoriteList={newsFavoriteList} />;
    }
  };

  return <div>{show()}</div>;
};

export default MainFavorite;
