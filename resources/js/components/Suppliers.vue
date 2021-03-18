<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Suppliers <router-link class="float-right" :to="{name: 'suppliers.products'}">Suplier Products</router-link></div>

                    <div class="card-body">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Name</th>
                              <th scope="col">Action</th>
                          </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(supplier, index) in suppliers">
                          <th scope="row">#</th>
                          <td v-text="supplier.name">Mark</td>
                          <td><button class="btn btn-danger btn-sm" @click="deleteSupplier(supplier.id)">Delete</button></td>
                      </tr>
                  </tbody>
              </table>

              <form method="POST" @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
                <div class="form-group">
                    <label for="name">Supplier Name:</label>
                    <input type="text" name="name" class="form-control form-control-sm" v-model="form.name" placeholder="Name" required="">
                    <span class="help text-danger" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></span>
                </div>
                <button class="btn btn-primary" type="submit" :disabled="form.errors.any()">Add Supplier</button>
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
            name: '',
        }),

        suppliers:[],
    }),

    mounted(){
        this.loadSuppliers();
    },

    methods: {
        // Add a supplier
        onSubmit() {
            this.form.post('/api/suppliers')
            .then(response => alert('Added Successfuly'));
            this.loadSuppliers();
        },

        // Read Suppliers
        loadSuppliers() {
            axios.get('/api/suppliers')
            .then(response => this.suppliers = response.data);
        },

        // Delete Suppliers
        deleteSupplier(id){
            axios.delete('/api/suppliers/' + id)
            .then(response => alert('Deleted Successfuly'));

            this.loadSuppliers();
        },
    }
}
</script>
