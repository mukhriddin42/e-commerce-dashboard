import React, { forwardRef, useContext } from 'react'
import { Button, ButtonToolbar, VStack, Form, Input, InputGroup, } from 'rsuite'
import { Checkbox } from 'rsuite';

const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const styles = {
    width: "100%",
    marginBottom: 10
};

import { SelectPicker } from 'rsuite';
import ImagePickerHook from '../hooks/ImagePicker';
import { ThemeContext } from '../hooks/useContext';

const data = ['USD', 'RUBL', 'EURO', 'BITC', 'UZS', 'KZTENGE', 'LOREM', 'LOREM2'].map(
    item => ({ label: item, value: item })
);

const AddProductTwo = () => {

    const {theme} = useContext(ThemeContext)
    return (
        <>

            <div className="mx-3">
                <div className="block md:flex md:items-center md:justify-between">
                    <h2 className='font-semibold! mb-3  font-sans!'>Add New Orders</h2>
                    <div className="flex flex-col justify-between   md:justify-end">
                        <ButtonToolbar>
                            <Button color='cyan' appearance='ghost' >Save to Drafts</Button>
                            <Button color="green" appearance="primary">
                                Publich
                            </Button>
                        </ButtonToolbar>
                    </div>
                </div>

                <div className='grid grid-cols-1  md:grid-cols-3 gap-5 mt-5'>
                    <div className="col-span-2 ">
                        <div className={
                            theme === "black"
                                ? "bg-gray-900 border border-gray-600 rounded-2xl"
                                : "bg-gray-50 border border-gray-300 rounded-2xl"
                        }>
                            <h4 className='m-4!'>Basic</h4>
                            <hr className='m-0!' />
                            <div className="m-4!">
                                <Form fluid>

                                    <Form.Group controlId="title-1">
                                        <Form.ControlLabel>Product Title</Form.ControlLabel>
                                        <Form.Control name="name" />

                                    </Form.Group>



                                    <div className="flex flex-col md:flex-row md:justify-between " >
                                        <Form.Group controlId="sku-1">
                                            <Form.ControlLabel>SKU</Form.ControlLabel>
                                            <Form.Control name="name" />
                                        </Form.Group>
                                        <Form.Group controlId="color-1">
                                            <Form.ControlLabel>Color</Form.ControlLabel>
                                            <Form.Control name="name" />
                                        </Form.Group>
                                        <Form.Group controlId="size-1">
                                            <Form.ControlLabel>Size</Form.ControlLabel>
                                            <Form.Control name="name" />
                                        </Form.Group>

                                    </div>

                                    <Form.Group controlId="brand-1">
                                        <Form.ControlLabel>Brand</Form.ControlLabel>
                                        <Form.Control name="name" />

                                    </Form.Group>

                                    <Form.Group controlId="textarea-1">
                                        <Form.ControlLabel>Description</Form.ControlLabel>
                                        <Form.Control rows={5} name="textarea" accepter={Textarea} />

                                    </Form.Group>

                                </Form>
                            </div>

                        </div>


                        <div className={
                            theme === "black"
                                ? "bg-gray-900 border border-gray-600 rounded-2xl mt-5"
                                : "bg-gray-50 border border-gray-300 rounded-2xl mt-5"
                        }>
                            <h4 className='m-4!'>Images</h4>
                            <hr className='m-0!' />
                            <div className="m-4!">
                                <Form fluid>

                                    <ImagePickerHook />



                                </Form>
                            </div>

                        </div>


                    </div>


                    <div>



                        <div className={
                            theme === "black"
                                ? "bg-gray-900 border border-gray-600 rounded-2xl"
                                : "bg-gray-50 border border-gray-300 rounded-2xl"
                        }>
                            <h4 className='m-4!'>Category</h4>
                            <hr className='m-0!' />
                            <div className="m-4!">
                                <Form fluid>

                                    <Form.Group controlId="tags-1">
                                        <Form.ControlLabel>Tags</Form.ControlLabel>
                                        <Form.Control name="name" />

                                    </Form.Group>

                                    <Form.Group >
                                        <Form.ControlLabel>Status</Form.ControlLabel>
                                        <VStack>
                                            <SelectPicker style={{ width: "100%" }} data={data} />
                                        </VStack>
                                    </Form.Group>


                                    <Form.Group >
                                        <Form.ControlLabel>Tags</Form.ControlLabel>
                                        <VStack>
                                            <SelectPicker style={{ width: "100%" }} data={data} />
                                        </VStack>
                                    </Form.Group>

                                    <hr />
                                    <h5>Categorys</h5>
                                    <Checkbox defaultChecked color="green" className='block!'>
                                        Make me Template
                                    </Checkbox>
                                    <Checkbox defaultChecked color="green" className='block!'>
                                        Make me Template
                                    </Checkbox>
                                    <Checkbox defaultChecked color="green" className='block!'>
                                        Make me Template
                                    </Checkbox>
                                    <Checkbox defaultChecked color="green" className='block!'>
                                        Make me Template
                                    </Checkbox>
                                    <Checkbox defaultChecked color="green" className='block!'>
                                        Make me Template
                                    </Checkbox>
                                    <Checkbox defaultChecked color="green" className='block!'>
                                        Make me Template
                                    </Checkbox>





                                </Form>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default AddProductTwo