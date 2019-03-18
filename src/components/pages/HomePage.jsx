import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {MainLayout} from 'components/layouts';
import {asyncConnect} from 'redux-connect';

@asyncConnect([{
  key: 'init-seo',
  promise: ({match: {params: {slug}}, store: {dispatch}, helpers}) => {
    let params = {
      filter: {
        where: {
          slug
        }
      }
    };
    let data = {
      categoryId: "5a031f41f75c7330ed575bfd",
      content: "<p style='text-align:justify;'>Đây là nội dung thử nghiệm</p>",
      description: "Giới thiệu về website của bạn",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS19mnk_0xgAW6pJhXIL4UwQnIif5AsgVGLOWOjSiXtDbKv3P-w",
      slug: "gioi-thieu-ve-website-cua-ban",
      title: "Giới thiệu về website của bạn",
    }
    let description = data.content.replace(/<(.|\n)*?>/g, '');
    dispatch({
      type: 'SEO_INFO',
      data: {
        title: data.title,
        description: description.substring(0, 300),
        image: data.image
      }
    });
  }
}])

class HomePage extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <MainLayout>
        <div>
          this is HomePage <Link to='/login'>FrontPage</Link>
        </div>
      </MainLayout>
    );
  }
}

export default HomePage
