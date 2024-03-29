import Link from "./Link";
import styled from "@emotion/styled";
import { ArrowBack } from "@mui/icons-material";

interface IProps {
  title: string;
  href: string;
}

function GoBack({ title, href }: IProps) {
  return (
    <Wrapper className="wrapper__back">
      <Link className="link_button wrapper__link" to={href}>
        <ArrowBack className="wrapper__back--icon"></ArrowBack>
        <div className="wrapper__back--text">{title}</div>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 51px;
  margin-bottom: 20px;
  .wrapper__link {
    display: flex;
    align-items: center;
  }
  ,
  .wrapper__back--icon {
    width: 23px;
    height: 23px;
    background-size: contain;
    cursor: pointer;
    font-size: 1.2em;
  }
  .wrapper__back--text {
    font-size: 18px;
    margin-left: 14px;
  }
`;

export default GoBack;
