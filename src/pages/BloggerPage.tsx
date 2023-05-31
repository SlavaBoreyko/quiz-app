import { useParams } from 'react-router-dom';

import { useFetchBloggerQuery } from '../features/blogger/bloggerApi';
import { useFetchTestsByBloggerIdQuery } from '../features/test/testApi';

import Container from '../components/Containers/Container/Container';
import { BloggerHeader } from '../components/Bloggers/BloggerHeader/BloggerHeader';
import { TestCardList } from '../components/Profile/TestCard/TestCardList/TestCardList';
import ButtonPlay from '../components/Buttons/ButtonPlay/ButtonPlay';
import FooterPolicy from '../components/Footers/FooterPolicy';

const BloggerPage = () => {
  const params = useParams();
  const { data: bloggerData } = useFetchBloggerQuery(params.id);
  const { data: allTestsByBlogger } = useFetchTestsByBloggerIdQuery(params.id);

  return (
    <Container justifyContent="flex-start" backgroundColor="#212529">
      <BloggerHeader blogger={bloggerData} />
      <TestCardList
        list={allTestsByBlogger}
        footerEl={<ButtonPlay width={'22%'} />}
      />
      <FooterPolicy language="ua" />
    </Container>
  );
};

export default BloggerPage;
