import { Spin, Form, Input, Button } from 'antd';
import React from 'react';
import { connect } from 'umi';
import 'antd/dist/antd.css';
import { useMount } from 'ahooks';
import styles from './style.less';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};




const Update = connect(({ companyAndupdate, loading }) => ({
    companyAndupdate,
    submitting: loading.effects['companyAndupdate/submit'],
    querying: loading.effects['companyAndupdate/loading']
}))(function(props) {


    useMount(
        () => {
            // console.log(props.querying);
            // console.log(props.submitting);
            props.dispatch({
                type: 'companyAndupdate/loading',
                payload: { id: props.location.query.id },
            });
        }
    );
    const onFinish = values => {

        props.dispatch({
            type: 'companyAndupdate/submit',
            payload: {...values, id: props.location.query.id },
        });
        // console.log(props.submitting);
    };
    const [form] = Form.useForm();



    if (props.companyAndupdate.data === undefined) {
        return ( <
            Spin / >
        );
    } else {
        return ( <
            div className = { styles.main } >
            <
            div className = { styles.header } >
            <
            h2 > Update company < /h2> <
            /div>

            <
            Form {...layout }
            form = { form }
            name = "nest-messages"
            onFinish = { onFinish }
            validateMessages = { validateMessages } >
            <
            Form.Item name = {
                ['company', 'name'] }
            label = "Name"
            initialValue = { props.companyAndupdate.data.name }
            rules = {
                [{
                    required: true,
                }, ]
            } >
            <
            Input / >
            <
            /Form.Item>


            <
            Form.Item name = {
                ['company', 'website'] }
            label = "Website"
            initialValue = { props.companyAndupdate.data.website } >
            <
            Input / >
            <
            /Form.Item> <
            Form.Item name = {
                ['company', 'phone'] }
            label = "Phone"
            initialValue = { props.companyAndupdate.data.phone }

            >
            <
            Input / >

            <
            /Form.Item> <
            Form.Item name = {
                ['company', 'address'] }
            label = "Address"
            initialValue = { props.companyAndupdate.data.address }

            >
            <
            Input / >
            <
            /Form.Item> <
            Form.Item name = {
                ['company', 'tag'] }
            label = "Tag"

            >
            <
            Input / >
            <
            /Form.Item> <
            Form.Item name = {
                ['company', 'url'] }
            label = "URL"
            initialValue = { props.companyAndupdate.data.url }


            >
            <
            Input / >
            <
            /Form.Item>



            <
            Form.Item wrapperCol = {
                {...layout.wrapperCol, offset: 8 } } >
            <
            Button type = "primary"
            htmlType = "submit"
            loading = { props.submitting } >
            Submit <
            /Button> <
            /Form.Item> <
            /Form> <
            /div>
        );
    }


});


export default Update;