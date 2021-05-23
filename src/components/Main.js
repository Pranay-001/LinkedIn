import styled from "styled-components";
import PostModal from "./PostModal";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { getArticlesAPI } from "../actions";
import ReactPlayer from "react-player";
const Main = (props) => {
  const [showModal, setShowModal] = useState("close");
  useEffect(() => {
    props.getArticles();
  }, []);
  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) return;
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      default:
        setShowModal("open");
    }
  };
  console.log(props);
  return (
    <>
      <Container>
        <ShareBox>
          <div>
            {props.user && props.user.photoURL ? (
              <img src={props.user.photoURL} alt="" />
            ) : (
              <img src="/images/user.svg" alt="" />
            )}
            <button
              disabled={props.loading ? true : false}
              onClick={handleClick}
            >
              Start a post
            </button>
          </div>
          <div>
            <button>
              <img src="/images/photo-icon.svg" alt="" />
              <span>Photo</span>
            </button>
            <button>
              <img src="/images/video-icon.svg" alt="" />
              <span>Video</span>
            </button>
            <button>
              <img src="/images/event-icon.svg" alt="" />
              <span>Event</span>
            </button>
            <button>
              <img src="/images/article-icon.svg" alt="" />
              <span>Write an article</span>
            </button>
          </div>
        </ShareBox>
        <Content>
          {props.loading && <img src="/images/spinner.svg" alt="" />}
          {props.articles.length === 0 ? (
            <p>There are no articles</p>
          ) : (
            props.articles.map((article, key) => {
              return (
                <Article key={key}>
                  <SharedActor>
                    <a>
                      <img src={article.actor.image} alt="" />
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>
                          {article.actor.date.toDate().toLocaleDateString()}
                        </span>
                      </div>
                    </a>
                    <button>
                      <img src="/images/ellipsis.svg" alt="" />
                    </button>
                  </SharedActor>
                  <Description>{article.description}</Description>
                  <SharedImg>
                    <a>
                      {!article.sharedIamge && article.video ? (
                        <ReactPlayer width="100%" url={article.video} />
                      ) : (
                        <img src={article.sharedImage} alt="" />
                      )}
                    </a>
                  </SharedImg>
                  <SocialCount>
                    <li>
                      <button>
                        <img
                          src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
                          alt=""
                        />
                        <img
                          src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f"
                          alt=""
                        />
                        <span>75</span>
                      </button>
                      <li>
                        <a>{article.comment} comments</a>
                      </li>
                    </li>
                  </SocialCount>
                  <SocialActions>
                    <button>
                      <img src="/images/like.svg" alt="" />
                      <span>Like</span>
                    </button>
                    <button>
                      <img src="/images/comment.svg" alt="" />
                      <span>Comments</span>
                    </button>
                    <button>
                      <img src="/images/share.svg" alt="" />
                      <span>Share</span>
                    </button>
                    <button>
                      <img src="/images/send.svg" alt="" />
                      <span>Send</span>
                    </button>
                  </SocialActions>
                </Article>
              );
            })
          )}
          ;
        </Content>

        <PostModal showModal={showModal} handleClick={handleClick} />
      </Container>
    </>
  );
};
const Container = styled.div`
  grid-area: main;
`;
const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;
const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin: 5px;
      }
      button {
        margin: 4px 0px;
        flex-grow: 1;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
      button {
        img {
          margin: 0 4px 0 -2px;
          width: 30px;
          height: 30px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;
const Article = styled(CommonCard)`
  padding: 0px;
  margin: 0 0 8px;
  overflow: visible;
`;
const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img {
      width: 48px;
      height: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
    img {
      background: transparent;
      height: 20px;
      width: 20px;
    }
  }
`;

const Description = styled.div`
  padding: 0px 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const SharedImg = styled.div`
  margin: 8px;
  width: 98%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCount = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0px 16px;
  padding: 8px 0px 16px;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    display: flex;
    align-self: center;
    width: 100%;
    justify-content: end;
    button {
      background-color: white;
      border: none;
      display: flex;
    }
  }
`;
const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0px;
  min-height: 40px;
  padding: 4px 4px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #0a66c2;
    background-color: white;
    border: none;

    img {
      height: 20px;
      width: 20px;
    }
    @media (min-width: 768px) {
      span {
        margin: 8px;
      }
    }
  }
`;
const Content = styled.div`
  text-align: center;
  & > img {
    height: 30px;
    width: 30px;
  }
`;
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    loading: state.articleState.loading,
    articles: state.articleState.articles,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
