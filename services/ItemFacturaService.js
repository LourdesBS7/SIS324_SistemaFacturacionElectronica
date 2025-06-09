const ItemFacturaRepository = require('../repositories/ItemFacturaRepository');
const ProductoRepository = require('../repositories/ProductoRepository');
const FacturaRepository = require('../repositories/FacturaRepository');

const ItemFacturaService = {
  async crearItem(data) {
    const producto = await ProductoRepository.obtenerPorId(data.idProducto);
    if (!producto) throw new Error('Producto no encontrado');

    const factura = await FacturaRepository.obtenerPorId(data.idFactura);
    if (!factura) throw new Error('Factura no encontrada');

    return await ItemFacturaRepository.crear(data);
  },

  async obtenerItems() {
    return await ItemFacturaRepository.obtenerTodos();
  },

  async obtenerItemPorId(id) {
    const item = await ItemFacturaRepository.obtenerPorId(id);
    if (!item) throw new Error('ItemFactura no encontrado');
    return item;
  },

  async eliminarItem(id) {
    const item = await ItemFacturaRepository.obtenerPorId(id);
    if (!item) throw new Error('ItemFactura no encontrado');

    return await ItemFacturaRepository.eliminar(id);
  }
};

module.exports = ItemFacturaService;
