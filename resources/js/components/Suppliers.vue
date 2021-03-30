<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Suppliers </div>

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
                          <td v-text="supplier.name"></td>
                          <td>
                            <button class="btn btn-danger btn-sm" @click="deleteSupplier(supplier.id)">Delete</button>
                        </td>
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
import axios from 'axios';
import Form from '../form';

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
            this.form.delete('/api/suppliers/' + id)
            .then(response => alert('Deleted Successfuly'));

            this.loadSuppliers();
        },
    }
}
</script>
