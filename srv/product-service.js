const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
    const { Products } = this.entities;
    
	this.on('READ', Products, async request => {
        try{
            const service = await cds.connect.to('s4EpmProducts');
            return await service.tx(request).run(request.query);
        } catch (err) {
            request.reject(err);
        }
    });
    
});