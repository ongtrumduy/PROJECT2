import React from "react"
import "./AdminDashBoard.css"
import request from "request"
import Home from "../../Content/Home"
import Friend from "../../Content/FriendList"
import Message from "../../Content/Message"
import Notify from "../../Content/Notify"
import Profile from "../../Content/Profile/Profile"


export default class AdminDashBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content_state: 0
        };
    }

    updateContentState = state => {
        this.setState({ content_state: state })
    };

    renderContent = () => {
        switch (this.state.contentState) {
            case 1: return (<div className="body-render"><Profile /></div>)
            case 2: return (<div className="body-render"><Friend /></div>)
            case 3: return (<div className="body-render"><Message /></div>)
            case 4: return (<div className="body-render"><Notify /></div>)
            default: return (<div className="body-render"><Home /></div>)
        }
    };

    userDashBoard = () => {
        return (
            <div>
                <div className="container">
                    <div className="header">
                        <h1>APP KẾT NỐI TRÒ CHUYỆN VÀ HẸN HÒ SINH VIÊN</h1>
                    </div>
                    <div className="content">
                        <div className="user-sub-menu">
                            <p>Xin chào, {this.state.fullname}</p>
                            <input className="logout" type="button" value="ĐĂNG XUẤT" onClick={() => { this.props.update_login(); }} />
                            <input className="change-password" type="button" value="ĐỔI MẬT KHẨU" onClick={() => { this.updateContentState(5) }} />
                        </div>" type="button" value="ĐỔI MẬT KHẨU" onClick={() => { this.updateContentState(1.2) }} /> */}
                        <div className="menu">

                            <div className="menu-0">
                                <input type="button" value="TRANG CHỦ" onClick={() => { this.updateContentState(0); }} />
                            </div>

                            <div className="menu-1">
                                <input type="button" value="BẠN BÈ" onClick={() => { this.updateContentState(1) }} />
                            </div>

                            <div className="menu-2">
                                <input type="button" value="TIN NHẮN" onClick={() => { this.updateContentState(2); }}></input>
                            </div>

                            <div className="menu-3">
                                <input type="button" value="THÔNG BÁO" onClick={() => { this.updateContentState(3); }}></input>
                            </div>

                            <div className="menu-4">
                                <input type="button" value="LIÊN HỆ" onClick={() => { this.updateContentState(4); }} />
                            </div>

                            <div className="menu-5">
                                <input type="button" value="GIỚI THIỆU" onClick={() => { this.updateContentState(5); }} />
                            </div>

                        </div>
                        <div className="body">
                            {this.renderContent()}
                        </div>


                    </div>
                    {/* <div className="s2"></div> */}

                    <div className="footer">
                        <p>App kết nối trò chuyện và hẹn hò Sinh viên ver 1.0</p>
                        <p>Design by Project 1-<a href="https://www.facebook.com/thoiloanhhung">Phạm Duy</a>- Đại học Bách khoa Hà Nội</p>
                        <p>
                            Hanoi University of Science and Technology - No. 1, Dai Co Viet
                            Str., Hanoi, Vietnam
                        </p>
                    </div>
                </div>
            </div >
        );
    }

    render() {
        return (
            <div>
                {this.userDashBoard()}
            </div>
        )
    }


}
