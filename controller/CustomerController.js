import {customers_db} from "../db/db.js";
import CustomerModel from "../model/CustomerModel.js";

$(document).ready(function () {
    const $customerForm = $('#customerForm');
    const $customerIdInput = $('#customerIdInput');
    const $customerNameInput = $('#customerNameInput');
    const $customerEmailInput = $('#customerEmailInput');
    const $customerPhoneInput = $('#customerPhoneInput');
    const $customerAddressInput = $('#customerAddressInput');
    const $customerTableBody = $('#customerTableBody');
    const $saveCustomerBtn = $('#saveCustomerBtn');
    const $updateCustomerBtn = $('#updateCustomerBtn');
    const $deleteCustomerBtn = $('#deleteCustomerBtn');
    const $resetCustomerBtn = $('#resetCustomerBtn');

    window.loadCustomersTable =  function() {
        $customerTableBody.empty();

        customers_db.forEach(customer => {
            const row = `
                            <tr data-id="${customer.id}" data-name="${customer.name}" data-email="${customer.email}" data-phone="${customer.phone}" data-address="${customer.address}">
                                <td>${customer.id}</td>
                                <td>${customer.name}</td>
                                <td>${customer.email}</td>
                                <td>${customer.phone}</td>
                                <td>${customer.address}</td>
                                <td>
                                    <button class="btn btn-sm btn-info view-customer me-1"><i class="fas fa-eye"></i> View</button>
                                    <button class="btn btn-sm btn-warning edit-customer me-1"><i class="fas fa-edit"></i> Edit</button>
                                    <button class="btn btn-sm btn-danger delete-customer"><i class="fas fa-trash-alt"></i> Delete</button>
                                </td>
                            </tr>
            `;

            // Add the row to the table
            $customerTableBody.append(row);
        });

        addCustomerTableListeners(); //Activate button listeners
    }

    function addCustomerTableListeners() {
        $customerTableBody.find('.edit-customer').on('click', function () {
            const $row = $(this).closest('tr');
            populateCustomerForm($row.data());
        });

        $customerTableBody.find('.view-customer').on('click', function () {
            const $row = $(this).closest('tr');
            populateCustomerForm($row.data());

            $customerForm.find('input, textarea, button').not('.btn-secondary').prop('disabled', true);
        });

        $customerTableBody.find('.delete-customer').on('click', function () {
            const $row = $(this).closest('tr');
            const customerId = $row.data('id');

            Swal.fire({
                title: 'Are you sure?',
                text: `Do you really want to delete customer ${customerId}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, keep it',
                background: '#1a1a1a',
                color: '#e0e0e0',
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteCustomer(customerId);
                    Swal.fire({
                        title: 'Deleted!',
                        text: `Customer ${customerId} has been deleted.`,
                        icon: 'success',
                        background: '#1a1a1a',
                        color: '#e0e0e0',
                    });
                }
            });
        });
    }


    // Function to add table data to input fields
    function populateCustomerForm(data) {
        // Add row data to input fields
        $customerIdInput.val(data.id);
        $customerNameInput.val(data.name);
        $customerEmailInput.val(data.email);
        $customerPhoneInput.val(data.phone);
        $customerAddressInput.val(data.address);

        //Manage button status
        $saveCustomerBtn.prop('disabled', true);
        $updateCustomerBtn.prop('disabled', false);
        $deleteCustomerBtn.prop('disabled', false);

        //Enable form inputs and textareas
        $customerForm.find('input, textarea').prop('disabled', false);
        $customerIdInput.prop('disabled', true);

    }

    //function to reset input fields
    window.resetCustomerForm =  function() {
        $customerForm[0].reset();
        // Make $customerIdInput empty
        $customerIdInput.val(getNextCustomerId());

        //Manage button status
        $saveCustomerBtn.prop('disabled', false);
        $updateCustomerBtn.prop('disabled', true);
        $deleteCustomerBtn.prop('disabled', true);

        //Enable form inputs and textareas
        $customerForm.find('input, textarea').prop('disabled', false);
        $customerIdInput.prop('disabled', true);

        loadCustomersTable();
    }

    //function save customer
    function saveCustomer() {

        let id = getNextCustomerId();
        let name = $customerNameInput.val();
        let email = $customerEmailInput.val();
        let phone = $customerPhoneInput.val();
        let address = $customerAddressInput.val();

        let customer_data = new CustomerModel(id,name,email,phone,address);

        if (validateCustomer(customer_data)) {
            // Add new customer object to customers array
            customers_db.push(customer_data);
            // Show saved success message
            Swal.fire({
                title: "Success",
                text: `Customer saved!`,
                icon: "success",
                background: '#1a1a1a',
                color: '#e0e0e0',
            });
            // Load table again
            loadCustomersTable();
            // Reset the form
            resetCustomerForm();

        }
    }

    //function update customer
    function updateCustomer() {
        const idToUpdate = $customerIdInput.val();

        let customerIndex = customers_db.findIndex(c => c.id === idToUpdate);

        if (customerIndex > -1) {

            // Get the updated customer details from the form
            const updatedCustomer = {
                id: idToUpdate,
                name: $customerNameInput.val(),
                email: $customerEmailInput.val(),
                phone: $customerPhoneInput.val(),
                address: $customerAddressInput.val()
            };

            // Validate the updated customer data
            if (validateCustomer(updatedCustomer)) {
                // If validation passes, update the customer in the db
                customers_db[customerIndex] = updatedCustomer;
                Swal.fire({
                    title: "Success",
                    text: `Customer ${idToUpdate} updated!`,
                    icon: "success",
                    background: '#1a1a1a',
                    color: '#e0e0e0',
                });

                //load the customer table data after adding data into array
                loadCustomersTable();

                //reset the customer form
                resetCustomerForm();
            }
        }
    }

    // Function to delete a customer
    function deleteCustomer(idToDelete) {

        const index = customers_db.findIndex(c => c.id === idToDelete);
        if (index !== -1) {
            customers_db.splice(index, 1);
        }

        Swal.fire({
            title: "Success",
            text: `Customer ${idToDelete} deleted!`,
            icon: "success",
            background: '#1a1a1a',
            color: '#e0e0e0',
        });

        loadCustomersTable();
        //reset the customer form
        resetCustomerForm();

    }

    $saveCustomerBtn.on('click', saveCustomer);
    $updateCustomerBtn.on('click', updateCustomer);

    $deleteCustomerBtn.on('click', function () {
        let idToDelete = $customerIdInput.val();

        Swal.fire({
            title: 'Are you sure?',
            text: `Do you really want to delete customer ${idToDelete}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
            background: '#1a1a1a',
            color: '#e0e0e0',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCustomer(idToDelete);
                Swal.fire({
                    title: 'Deleted!',
                    text: `Customer ${idToDelete} has been deleted.`,
                    icon: 'success',
                    background: '#1a1a1a',
                    color: '#e0e0e0',
                });
            }
        });
    });


    $resetCustomerBtn.on('click', resetCustomerForm);

    function getNextCustomerId() {
        let lastCustomerId = customers_db[customers_db.length - 1]?.id || 'C000';
        let lastIdNumber = parseInt(lastCustomerId.substring(1));
        let nextIdNumber = lastIdNumber + 1;

        let newCustomerId = `C${nextIdNumber.toString().padStart(3, '0')}`;

        while (customers_db.some(customer => customer.id === newCustomerId)) {
            // If it exists, increment and try again
            nextIdNumber++;
            newCustomerId = `C${nextIdNumber.toString().padStart(3, '0')}`;
        }

        return newCustomerId;
    }


});

