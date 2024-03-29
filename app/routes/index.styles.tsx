import styled from "@emotion/styled";

interface SecondaryHeaderProps {
  open: boolean;
}

export const HomePageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(218, 218, 218);
  overflow-y: auto;
`;

export const MiddleHomePageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(231, 231, 231);
  overflow-y: auto;
`;

export const HomeHeader = styled.div`
  width: 100vw;
  height: 80px;
  background-color: rgb(35, 37, 41);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
  top: 0;
`;

export const IconButton = styled.div`
  color: white;
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: fixed;
    right: 20px;
    top: 25px;
    z-index: 2;
  }
`;

export const SecondaryHeader = styled.div<SecondaryHeaderProps>`
  width: 100vw;
  height: 80px;
  margin-top: 80px;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  padding: 10px;
  position: fixed;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: 100%;
    width: 240px;
    right: 0;
    gap: 40px;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: rgb(231, 231, 231);
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    transition: transform 0.3s ease-in-out;
  }
`;

export const StackContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`;

export const Logo = styled.div`
  margin-right: 25px;
  @media screen and (max-width: 768px) {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-right: 0;
  }
`;

export const HomeTitle = styled.button`
  font-family: "Roboto", sans-serif;
  font-size: 1.5rem;
  color: rgb(175, 46, 51);
  background-color: transparent;
  border: none;
  transition: all 0.3s ease-in-out;
  width: 200px;
  height: 80px;

  &:hover {
    color: #fff;
    background-color: rgb(175, 46, 51, 0.3);
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    &:hover {
      color: rgb(175, 46, 51);
      background-color: transparent;
    }
  }
`;

export const PageContainerTitle = styled.h1`
  color: black;
  width: 95%;
  textalign: left;
  padding: 30px 5px;
  font-size: 50px;
  margin: 0;
`;
