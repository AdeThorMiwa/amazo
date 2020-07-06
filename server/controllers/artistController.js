const Artist = require("./../models/artistModel");
const factory = require("./../factory/DBFactory");

exports.get = factory.getAll(Artist);

exports.getOne = factory.getOne(Artist);

exports.create = factory.createOne(Artist);

exports.update = factory.updateOne(Artist);

exports.delete = factory.deleteOne(Artist);
