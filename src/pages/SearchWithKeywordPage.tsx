import { useParams } from "react-router";

const SearchWithKeywordPage = () => {
  const { keyword } = useParams<{ keyword: string }>();
  return <div>{keyword} 결과 페이지</div>;
};

export default SearchWithKeywordPage;
