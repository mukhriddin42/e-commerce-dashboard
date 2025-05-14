import React, { forwardRef } from 'react'
import { Button, ButtonToolbar, VStack } from 'rsuite'

import { Form, Input, InputGroup, InputNumber } from 'rsuite';

const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const styles = {
  marginBottom: 10
};

import { SelectPicker } from 'rsuite';

const data = ['USD', 'RUBL', 'EURO', 'BITC', 'UZS', 'KZTENGE', 'LOREM', 'LOREM2'].map(
  item => ({ label: item, value: item })
);

const AddProducts = () => {
  return (
    <>

      <div className="mx-3">
        <div className="flex items-center justify-between">
          <h2 className='font-semibold! mb-3 font-sans!'>Add New Product</h2>
          <div className="flex">
            <ButtonToolbar>
              <Button color='cyan' appearance='ghost' >Save to Drafts</Button>
              <Button color="green" appearance="primary">
                Publich
              </Button>
            </ButtonToolbar>
          </div>
        </div>

        <div className='grid grid-cols-3 gap-5 mt-5'>
          <div className="col-span-2 bg-gray-50 border border-gray-300 rounded-2xl">
            <h4 className='m-4!'>Basic</h4>
            <hr className='m-0!' />
            <div className="m-4!">
              <Form fluid>

                <Form.Group controlId="title-1">
                  <Form.ControlLabel>Product Title</Form.ControlLabel>
                  <Form.Control name="name" />

                </Form.Group>

                <Form.Group controlId="textarea-1">
                  <Form.ControlLabel>Textarea</Form.ControlLabel>
                  <Form.Control rows={5} name="textarea" accepter={Textarea} />

                </Form.Group>

                <div className="flex justify-between" >
                  <Form.Group controlId="reg-price-1">
                    <Form.ControlLabel>Regular Price</Form.ControlLabel>
                    <InputGroup inside style={styles}>
                      <InputGroup.Addon>$</InputGroup.Addon>
                      <Input />
                      <InputGroup.Addon>.00</InputGroup.Addon>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group controlId="pro-price-1">
                    <Form.ControlLabel>Promotion Price</Form.ControlLabel>
                    <InputGroup inside style={styles}>
                      <InputGroup.Addon>$</InputGroup.Addon>
                      <Input />
                      <InputGroup.Addon>.00</InputGroup.Addon>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group controlId="currency-price-1">
                    <Form.ControlLabel>Currency Price</Form.ControlLabel>
                    <VStack>
                      <SelectPicker data={data} style={{ width: 224 }} />
                    </VStack>
                  </Form.Group>

                </div>

                <Form.Group controlId="tax-rate-1">
                  <Form.ControlLabel>Tax Rate</Form.ControlLabel>
                  <Form.Control name="name" />

                </Form.Group>

              </Form>
            </div>
          </div>
          <div>2</div>
        </div>

      </div>

    </>
  )
}

export default AddProducts