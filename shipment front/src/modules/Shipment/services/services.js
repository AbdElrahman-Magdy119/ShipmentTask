import { axoisInstance } from "src/http-common";
class ShipmentServices {



  getShipment() {
    return axoisInstance.get("shipment");
  }

  allUsers() {
    return axoisInstance.get("user");
  }

  addShipment(shipment) {
   return axoisInstance.post('shipment',shipment);
  }

    editShipment(id,shipment) {
    return axoisInstance.patch(`shipment/${id}`,shipment);
    }
  
//  deleteReview(reviewId,productId) {
//     return axoisInstance.delete(`delete/review/product/${reviewId}?product_id=${productId}`);
//   }

//   getReview(productID) {
//     return axoisInstance.get(`review/product/${productID}`);
//   }


  getShipmentByID(shipmentID) {
    return axoisInstance.get(`shipment/${shipmentID}`);
  }
  



}

export default new ShipmentServices();
