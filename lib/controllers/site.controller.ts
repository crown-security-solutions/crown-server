import { Request, Response } from 'express';
import { Site } from '../models/site.model';
import { SiteStrength } from '../models/site_strength.model';
import { range } from 'lodash';
const { GoogleSpreadsheet } = require('google-spreadsheet');
const {parse, stringify} = require('flatted');

export class SiteController{
	create(req: Request, res: Response) {
    return Site
      .create({
        name: req.body.name,
        address: req.body.address,
        contact: req.body.contact,
        contact_person: req.body.contact_person,
        active: req.body.active,
      })
      .then((site) => res.status(201).send(site))
      .catch((error) => res.status(400).send(error));
  }

  list(req: Request, res: Response) {
    return Site
      .findAll({
        order: [
          ['createdAt', 'DESC'],
        ],
        include: [
					{ 
            model: SiteStrength,
            order: [
              ['requirement_date', 'DESC']
            ],
            limit: 1,
						as: 'site_strengths' 
					}
				]
      })
      .then((sites) => res.status(200).send(sites))
      .catch((error) => res.status(400).send(error));
  }

  retrieve(req: Request, res: Response) {
    return Site
      .findByPk(req.params.siteId, {
      })
      .then((site) => {
        if (!site) {
          return res.status(404).send({
            message: 'Site Not Found',
          });
        }
        return res.status(200).send(site);
      })
      .catch((error) => res.status(400).send(error));
  }

  update(req: Request, res: Response) {
    return Site
      .findByPk(req.params.siteId, {
      })
      .then(site => {
        if (!site) {
          return res.status(404).send({
            message: 'Site Not Found',
          });
        }
        return site
          .update({
          })
          .then(() => res.status(200).send(site))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }

  destroy(req: Request, res: Response) {
    return Site
      .findByPk(req.params.siteId)
      .then(site => {
        if (!site) {
          return res.status(400).send({
            message: 'Site Not Found',
          });
        }
        return site
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
	}
	updateSiteStrength(req: Request, res: Response) {
    return Site
      .findAll({
        order: [
          ['createdAt', 'DESC'],
        ]
      })
      .then((sites) => {
				let site_strengths : SiteStrength[] = [];
				sites.forEach(x => {
					range(1, +x.shift + 1).forEach(e => {
						const site_strength: any = {
							site_id: x.id,
							strength_count: 5,
							shift: e
						};
						site_strengths.push(site_strength);
					});
				});
				SiteStrength.bulkCreate(site_strengths).then((x) => res.status(200).send(x));
			})
      .catch((error) => res.status(400).send(error));
  }

  async importSiteAndStrength(req: Request, res: Response) {
    const creds = require('../config/crown-creds.json');
    const doc = new GoogleSpreadsheet('1ggI3kwIBxgQnO-ek2VqhQC7xZVtt0TmE1Y5O-EWIawA');
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const site_db_sheet = doc.sheetsByIndex[2];
    const rows = await site_db_sheet.getRows();

    const sites : Site[] = [];
    const site_strengths : SiteStrength[] = [];

    rows.forEach(x => {
      const site: any = {
        id: x.id,
        name: x.name,
        site_code: x.site_code,
        shift: +x.shift || 0
      };
      sites.push(site);

      const site_strength: any = {
        site_id: +x.id,
        strength_count_day: +x.day || 0,
        strength_count_general: +x.general || 0,
        strength_count_night: +x.night || 0
      };
      site_strengths.push(site_strength);

    });

    // res.send({sites,site_strengths});
    Site.bulkCreate(sites).then((x) => {
      SiteStrength.bulkCreate(site_strengths).then((y) => res.status(200).send(y));
    });

  }
}