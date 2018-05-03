import React, { Component } from "react";
import { Form, Button } from 'antd';

import components from '../inputs';

const FormItem = Form.Item;

class CreateForm extends Component {
  state = {
    isLoading: false,
  };

  toggleLoading = () => {
    this.setState(prevState => ({
      isLoading: !prevState.isLoading,
    }))
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, form: { validateFields, resetFields } } = this.props;
    validateFields((err, values) => {
      if (err) {
        return;
      }
      this.toggleLoading();
      onSubmit(values);
      resetFields();
      this.toggleLoading();
    });
  };

  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };
  render() {
    const { layout, scheme, buttonName, form: { getFieldDecorator, getFieldsError } } = this.props;
    const { isLoading } = this.state;
    return (
      <Form
        onSubmit={this.handleSubmit}
      >
        {
          scheme.map(field => (
            <FormItem
              {...layout.items}
              label={field.label}
              key={field.name}
            >
              {getFieldDecorator(field.name, {
                rules: [
                  {
                    ...field.rules
                  },
                  {
                    required: field.required || false,
                    message: field.message || 'Please fill this input',
                  }
                ],
              })(
                components[field.type]({ disabled: isLoading, ...field.props })
              )}
            </FormItem>
          ))
        }
        <FormItem
          {...layout.button}
        >
          <Button
            type="primary"
            htmlType="submit"
            disabled={this.hasErrors(getFieldsError()) || isLoading}
            loading={isLoading}
          >
            { buttonName }
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(CreateForm);