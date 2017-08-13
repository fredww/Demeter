import React from "react";
import {Button, Form, Icon, Input, Modal, Upload} from "antd";
import {homeStyle} from "./styles/home";
import {connect} from "react-redux";
import {MSG_PROJECT_DES, MSG_PROJECT_NAME} from "../constants/stringConstant";
import {showLogoPreviewAction, uploadLogoAction} from "../actions/projectManager";

const FormItem = Form.Item;
const {TextArea} = Input;

// 项目管理-新建项目
class CreateProjectView extends React.Component {

    render() {
        const {getFieldDecorator} = this.props.form;

        const {previewVisible, previewImage, logo} = this.props;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <div style={homeStyle.view_content}>
                <Form
                    layout={'vertical'}
                    style={{width: 300}}
                    onSubmit={this._handleSubmit.bind(this)}>
                    <FormItem
                        label="项目Logo">
                        {getFieldDecorator('projectLogo')(
                            <div>
                                <Upload
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    listType="picture-card"
                                    fileList={logo}
                                    onPreview={file => this.props.showLogoPreview(true, file)}
                                    onChange={this.onLogoChange}
                                >
                                    {logo.length >= 1 ? null : uploadButton}
                                </Upload>
                                <Modal
                                    visible={previewVisible}
                                    footer={null}
                                    onCancel={() => this.props.showLogoPreview(false)}>
                                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                                </Modal>
                            </div>
                        )}
                    </FormItem>
                    <FormItem
                        label="项目名称">
                        {getFieldDecorator('projectName', {
                            rules: [{min: 2, message: MSG_PROJECT_NAME}],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label="项目描述">
                        {getFieldDecorator('projectDes', {
                            rules: [{min: 3, message: MSG_PROJECT_DES}],
                        })(
                            <TextArea autosize={{minRows: 2, maxRows: 3}}/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit">
                            {'创建新项目'}
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }

    /**
     * logo 变化
     */
    onLogoChange = (({ fileList }) => {
        this.setState({});
        this.props.uploadLogo(fileList)
    });

    /**
     * 点击创建新项目
     * @param e
     * @private
     */
    _handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.createUser(values.account);
            }
        });
    }
}

const CreateProjectViewFrom = Form.create()(CreateProjectView);

function select(state) {
    return {
        previewVisible: state.projectManager.previewVisible,
        previewImage: state.projectManager.previewImage,
        logo: state.projectManager.logo,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showLogoPreview: (previewVisible, file) => dispatch(showLogoPreviewAction(previewVisible, file)),
        uploadLogo: file => dispatch(uploadLogoAction(file)),
    }
}

export default connect(select, mapDispatchToProps)(CreateProjectViewFrom);