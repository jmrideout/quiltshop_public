class CustomerSerializer:
    def __init__(self, data):
        self.data = data

    @property
    def customer(self):
        customer_detail = {
            "id":          self.data.id,
            "first_name":  self.data.first_name,
            "last_name":   self.data.last_name,
            "address1":    self.data.address1,
            "address2":    self.data.address2,
            "address3":    self.data.address3,
            "city":        self.data.city,
            "state":       self.data.state,
            "zipcode":     self.data.zipcode,
            "zipdode_ext": self.data.zipcode_ext,
            "email":       self.data.email,
            "phone":       self.data.phone
        }
        return customer_detail

    @property
    def all_customers(self):
        output = {"customers": []}
        for customer in self.data:
            customer_detail = CustomerSerializer(customer).customer
            output['customers'].append(customer_detail)
        return output

