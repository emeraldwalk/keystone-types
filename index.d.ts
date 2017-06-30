/// <reference types="mongoose" />

declare namespace Keystone {
	export interface IFieldTypes {
		Boolean;
		Code;
		Color;
		Date;
		Datetime;
		Email;
		Html;
		Key;
		Location;
		Markdown;
		Money;
		Name;
		Number;
		Password;
		Select;
		Text;
		Textarea;
		Url;

		Relationship;

		//storage
		AzureFile;
		CloudinaryImage;
		CloudinaryImages;
		Embedly;
		LocalFile;
		S3File;
	}

	export interface IDocumentRaw {
		id?: string;
		isNew?: boolean;
		wasNew?: boolean;
		save?<T>(callback?: (err: any, res: T) => void): void;
	}

	export interface IField {
		Types: IFieldTypes;
	}

	export interface ISession {
		signin(
			credentials: {email: string, password: string},
			req,
			res,
			onSuccess: Function,
			onError: Function);
	}
}

declare module 'mongoose' {
	export interface Model<T extends Document> {
		count(): Query<number>;
		find(): Query<T[]>;
	}
}

declare module 'keystone' {

	import * as mongoose from 'mongoose';

	export interface IDocument extends mongoose.Document {
		getUpdateHandler<TDocumentRaw extends Keystone.IDocumentRaw>(req): IDocumentUpdateHandler<TDocumentRaw>;
	}

	export type IDocumentFull<TDocumentRaw extends Keystone.IDocumentRaw> = TDocumentRaw & IDocument;
	export type DocumentQuery<TDocumentRaw extends Keystone.IDocumentRaw> = mongoose.Query<TDocumentRaw & IDocument>;

	export interface IDocumentUpdateHandler<TDocumentRaw extends Keystone.IDocumentRaw> {
		process(document: TDocumentRaw, callback: (err) => any);
		process(
			document: TDocumentRaw,
			options: { flashErrors: boolean, fields: string, errorMessage: string },
			callback: (err) => any);
	}

	export interface IList<TDocumentRaw extends Keystone.IDocumentRaw> {
		model: mongoose.Model<TDocumentRaw & IDocument>;
		fields;
		paginate(options: {page?: number, perPage?: number, maxPages?: number});
	}

	export function init(config: any);
	export function list<TDocument extends Keystone.IDocumentRaw>(name: string): IList<TDocument>;
	export function get(key: string): any;
	export function set(key: string, value: any);
	export function pre(key: string, handler: (req, res, next) => any);
	export function importer(path: string): (path: string) => any;
	export function start();

	export var Email: new (name: string) => any;
	export var List: new (name: string, listOptions?: any) => any;
	export var View: new (req, res) => any;

	export var utils;
	export var Field: Keystone.IField;
	export var content;
	export var middleware: {api};
	export var session: Keystone.ISession;
}