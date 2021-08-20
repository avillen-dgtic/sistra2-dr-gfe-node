/**
 * DRDomain
 * Copyright(c) 2021 Alejandro Villén
 * MIT Licensed
 */
import { Pool } from "pg";

class DRDomain {

	// Database instance

	public pool: any = undefined;
	public drDT: any = {
		error: false,
		codiError: undefined,
		descripcionError: undefined,
		codigoRetorno: undefined,
		datos: []
	};


	constructor() {
		const config: any = {
			user: process.env.POSTGRES_USER,
			host: process.env.POSTGRES_HOST,
			password: process.env.POSTGRES_PASS,
			database: process.env.POSTGRES_DATABASE,
		};
		this.pool = new Pool(config);
	}


	/**
	 * query
	 * @param query
	 * @param params
	 * @returns drDataType
	 */
	async query(query: string) {
		console.log(`Query: ${query}`);
		const drReturn = this.drDT;
		try {
			const result: any = await this.pool.query(query);
			drReturn.datos = result.rows;
		} catch (e) {
			console.error(e);
		}
		return drReturn;

	}

	/**
	 * empty
	 * @returns drDataType
	 */

	empty(): any {
		const drReturn = this.drDT;
		drReturn.datos = [];
		return drReturn;
	}

	parseParams(params: any): string {

		if (params.filtro === undefined || params.filtro.length <= 0) return "";

		let retQuery: string = "WHERE true";
		const filterParams: [] = params.filtro;
		for (const item in filterParams) {
			if (Object.prototype.hasOwnProperty.call(filterParams, item)) {
				retQuery = `${retQuery} AND ${filterParams[item].codigo}::text ~ '${filterParams[item].valor}'::text`;
			}
		}

		console.log(retQuery);
		return retQuery;
	}

}

export let drDomain = new DRDomain();