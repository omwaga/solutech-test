<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Order Details</div>

                    <div class="card-body">

                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Order</th>
                              <th scope="col">Product</th>
                              <th scope="col">Action</th>
                          </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(detail, index) in details">
                          <th scope="row">#</th>
                          <td v-text="detail.order.order_number"></td>
                          <td v-text="detail.product.name"></td>
                          <td><button class="btn btn-danger btn-sm" @click="deleteDetail(detail.id)">Delete</button></td>
                      </tr>
                  </tbody>
              </table>

              <form method="POST" @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">

                <div class="form-group">
                    <label for="order_id">Order:</label>
                    <select class="form-control" name="order_id" v-model="form.order_id">
                        <option value="">Select Order Number</option>
                        <option v-for="order in orders" :value="order.id">{{order.order_number}}</option>
                    </select>
                    <span class="help text-danger" v-if="form.errors.has('order_id')" v-text="form.errors.get('order_id')"></span>
                </div>

                <div class="form-group">
                    <label for="product_id">Select Product:</label>
                    <select class="form-control" name="" v-model="form.product_id">
                        <option value="">Select Product</option>
                        <option v-for="product in products" :value="product.id">{{product.name}}</option>
                    </select>
                    <span class="help text-danger" v-if="form.errors.has('product_id')" v-text="form.errors.get('product_id')"></span>
                </div>

                <button class="btn btn-primary" type="submit" :disabled="form.errors.any()">Add Order Detail</button>
            </form>

        </div>
    </div>
</div>
</div>
</div>
</template>

<script>
import axios from 'axios'

class Errors {
    /**
    * Create a new Errors instance.
    */
    constructor() {
        this.errors = {};
    }


/**
* Determine if any errors exists for the given  input field.
*
* @param {string} field
*/
has(field) {
    return this.errors.hasOwnProperty(field);
}


/**
* Determine if we have any form errors.
*/
any() {
    return Object.keys(this.errors).length > 0;
}


/**
* Retrieve the error message for a particular input field.
*
* @param {string} field
*/
get(field) {
    if (this.errors[field]) {
        return this.errors[field][0];
    }
}


/**
* Record the new errors.
*
* @param {object} errors
*/
record(errors) {
    this.errors = errors;
}


/**
* Clear one or all error fields.
*
* @param {string|null} field
*/
clear(field) {
    if (field) {
        delete this.errors[field];

        return;
    }

    this.errors = {};
}
}


class Form {
/**
* Create a new Form instance.
*
* @param {object} data
*/
constructor(data) {
    this.originalData = data;

    for (let field in data) {
        this[field] = data[field];
    }

    this.errors = new Errors();
}


/**
* Fetch all relevant data for the form.
*/
data() {
    let data = {};

    for (let property in this.originalData) {
        data[property] = this[property];
    }

    return data;
}


/**
* Reset the form fields.
*/
reset() {
    for (let field in this.originalData) {
        this[field] = '';
    }

    this.errors.clear();
}


/**
* Send a POST request to the given URL.
* .
* @param {string} url
*/
post(url) {
    return this.submit('post', url);
}


/**
* Send a PUT request to the given URL.
* .
* @param {string} url
*/
put(url) {
    return this.submit('put', url);
}


/**
* Send a PATCH request to the given URL.
* .
* @param {string} url
*/
patch(url) {
    return this.submit('patch', url);
}


/**
* Send a DELETE request to the given URL.
* .
* @param {string} url
*/
delete(url) {
    return this.submit('delete', url);
}


/**
* Submit the form.
*
* @param {string} requestType
* @param {string} url
*/
submit(requestType, url) {
    return new Promise((resolve, reject) => {
        axios[requestType](url, this.data())
        .then(response => {
            this.onSuccess(response.data);

            resolve(response.data);
        })
        .catch(error => {
            this.onFail(error.response.data.errors);

            reject(error.response.data);
        });
    });
}

/**
* Handle a successful form submission.
*
* @param {object} data
*/
onSuccess(data) {
alert(data.message); // temporary

this.reset();
}


/**
* Handle a failed form submission.
*
* @param {object} errors
*/
onFail(errors) {
    this.errors.record(errors);
}
}

export default {
    data: () => ({
        form: new Form({
            order_id: '',
            product_id: '',
        }),

        details:[],
        orders:[],
        products:[],
    }),

    mounted(){
        this.loadDetails();

        axios.get('/api/all-orders')
        .then(response => this.orders = response.data);

        axios.get('/api/products')
        .then(response => this.products = response.data);
    },

    methods: {
        // Add an Order Detail
        onSubmit() {
            this.form.post('/api/order-details')
            .then(response => alert('Added Successfuly'));

            this.loadDetails();
        },

        // Read Order Details
        loadDetails() {
            axios.get('/api/order-details')
            .then(response => this.details = response.data);
        },

        // Delete Order Detail
        deleteDetail(id){
            axios.delete('/api/order-details/' + id)
            .then(response => alert('Deleted Successfuly'));

            this.loadDetails();
        },
    }
}
</script>
