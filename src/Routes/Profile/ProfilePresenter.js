import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";

const Wrapper = styled.div`
  min-height: 60vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderColumn = styled.div``;

const Username = styled.span`
  font-size: 25px;
  margin-bottom: 10px;
  display: block;
`;

const Counts = styled.ul`
  display: flex;
`;

const Count = styled.li``;

const Bio = styled.p``;

export default ({ loading, data }) => {
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeUser) {
    const {
      seeUser: {
        id,
        avatar,
        name,
        fullName,
        isFollowing,
        isSelf,
        bio,
        followingCount,
        followersCount,
        postsCount,
        posts
      }
    } = data;
    return (
      <>
        <Header>
          <HeaderColumn>
            <Avatar size="lg" url={avatar} />
          </HeaderColumn>
          <HeaderColumn>
            <Username>{name}</Username>
            <Counts>
              <Count>
                <FatText text={String(postsCount)} /> 게시물
              </Count>
              <Count>
                <FatText text={String(followersCount)} /> 팔로워
              </Count>
              <Count>
                <FatText text={String(followingCount)} /> 팔로우
              </Count>
            </Counts>
            <FatText text={fullName} />
            <Bio>{bio}</Bio>
          </HeaderColumn>
        </Header>
      </>
    );
  }
  return null;
};
