import React, { forwardRef } from 'react'
import { Button, ButtonToolbar, VStack, Form, Input, InputGroup, } from 'rsuite'
import { Checkbox } from 'rsuite';


const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const styles = {
  width: "100%",
  marginBottom: 10
};

import { SelectPicker } from 'rsuite';
import ImagePickerHook from '../hooks/ImagePicker';
import useFetch from '../hooks/api';

const selectdata = ['USD', 'RUBL', 'EURO', 'BITC', 'UZS', 'KZTENGE', 'LOREM', 'LOREM2'].map(
  item => ({ label: item, value: item })
);



const AddProducts = () => {

  // const {data ,loading , error} = useFetch('https://67ff8e4c58f18d7209f1b2db.mockapi.io/users/imgget')
  // console.log(data);

  
  return (
    <>

      
        <div className="ml-3  md:mx-3 ">
          <div className="block md:flex items-center justify-between">
            <h2 className='font-semibold! text-xl!  mb-3 font-sans!'>Add New Product</h2>
            <div className="flex justify-between mt-2 md:justify-end gap-2">
              
                <Button color='cyan' appearance='ghost' >Save to Drafts</Button>
                <Button color="green" appearance="primary">
                  Publich
                </Button>
              
            </div>
          </div>

          <div className='grid grid-cols-1  md:grid-cols-3 gap-0 md:gap-5 mt-5'>
            <div className="col-span-2 ">
              <div className='bg-gray-50 border border-gray-300 rounded-2xl'>
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

                    <div className="flex flex-col md:flex-row justify-between gap-2" >
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
                      <Form.Group controlId="currency-price-1" className='mb-4'>
                        <Form.ControlLabel>Currency Price</Form.ControlLabel>
                        <VStack>
                          <SelectPicker data={selectdata} style={{ width: 224 }} />
                        </VStack>
                      </Form.Group>

                    </div>

                    <Form.Group controlId="tax-rate-1">
                      <Form.ControlLabel>Tax Rate</Form.ControlLabel>
                      <Form.Control name="name" />

                    </Form.Group>

                    <Checkbox defaultChecked color="green">
                      Make me Template
                    </Checkbox>

                  </Form>
                </div>

              </div>


              <div className='bg-gray-50 border border-gray-300 rounded-2xl mt-5 pb-5'>
                <h4 className='m-4!'>Shipping</h4>
                <hr className='m-0!' />
                <div className="m-4!">
                  <Form fluid>
                    <div className=" flex flex-col md:flex-row md:justify-between gap-0 md:gap-5 " >
                      <Form.Group controlId="width-1" className='w-full'>
                        <Form.ControlLabel>Width</Form.ControlLabel>
                        <InputGroup inside >
                          <InputGroup.Addon>Inch</InputGroup.Addon>
                          <Input />
                        </InputGroup>
                      </Form.Group> 
                      <Form.Group controlId="hight-1" className='w-full mb-4'>
                        <Form.ControlLabel>Hieght</Form.ControlLabel>
                        <InputGroup inside >
                          <InputGroup.Addon>Inch</InputGroup.Addon>
                          <Input />
                        </InputGroup>
                      </Form.Group>


                    </div>

                    <Form.Group controlId="wieght-1">
                      <Form.ControlLabel>Wieght</Form.ControlLabel>
                      <InputGroup inside style={styles}>
                        <InputGroup.Addon>gam</InputGroup.Addon>
                        <Input />
                      </InputGroup>

                    </Form.Group>




                    <Form.Group controlId="tax-rate-1">
                      <Form.ControlLabel>Tax Rate</Form.ControlLabel>
                      <Form.Control name="name" />

                    </Form.Group>


                    <Form.Group controlId="fies-1" >
                      <Form.ControlLabel>Shopping Fies</Form.ControlLabel>
                      <InputGroup inside style={styles}>
                        <InputGroup.Addon>$</InputGroup.Addon>
                        <Input />
                        <InputGroup.Addon>.00</InputGroup.Addon>
                      </InputGroup>
                    </Form.Group>

                  </Form>
                </div>

              </div>


            </div>


            <div>
              <div className='bg-gray-50 border mt-5 md:mt-0 border-gray-300 rounded-2xl  pb-5'>
                <h4 className='m-4!'>Media</h4>
                <hr className='m-0!' />
                <div className="m-4!">
                  <Form fluid>

                    <ImagePickerHook />



                  </Form>
                </div>

              </div>


              <div className='bg-gray-50 border  border-gray-300 rounded-2xl mt-5 pb-5'>
                <h4 className='m-4!'>Organization</h4>
                <hr className='m-0!' />
                <div className="m-4!">
                  <Form fluid>

                    <div className="justify-between grid grid-cols-1 md:grid-cols-2 gap-1">

                      <Form.Group >
                        <Form.ControlLabel>Category</Form.ControlLabel>
                        <VStack>
                          <SelectPicker style={{ width: "100%" }} data={selectdata} />
                        </VStack>
                      </Form.Group>
                      <Form.Group >
                        <Form.ControlLabel>Sub Category</Form.ControlLabel>
                        <VStack>
                          <SelectPicker style={{ width: "100%", marginBottom: "1rem" }} data={selectdata} />
                        </VStack>
                      </Form.Group>

                    </div>



                    <Form.Group controlId="tags-1">
                      <Form.ControlLabel>Tags</Form.ControlLabel>
                      <Form.Control name="name" />

                    </Form.Group>
                  </Form>
                </div>

              </div>
            </div>
          </div>

        </div>


    </>
  )
}

export default AddProducts