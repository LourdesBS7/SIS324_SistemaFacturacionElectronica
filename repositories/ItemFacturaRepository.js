const ItemFactura = require('../models/ItemFactura');
const Producto = require('../models/Producto');

const ItemFacturaRepository = {
  async crear(data) {
    return await ItemFactura.create(data);
  },

  async obtenerTodos() {
    return await ItemFactura.findAll({ include: Producto });
  },

  async obtenerPorId(id) {
    return await ItemFactura.findByPk(id, { include: Producto });
  },

  async eliminar(id) {
    return await ItemFactura.destroy({ where: { idItem: id } });
  }
};

module.exports = ItemFacturaRepository;
