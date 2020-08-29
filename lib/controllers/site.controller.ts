import { Request, Response } from 'express';
import { Site } from '../models/site.model';
import { SiteStrength } from '../models/site_strength.model';
import { range } from 'lodash';
import { SiteStrengthDetails } from '../models/site_strength_details.model';
import { User } from '../models/user.model';
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
    // const site_db_sheet = doc.sheetsByIndex[2];
    // const rows = await site_db_sheet.getRows();
    // const site_strength_details_sheet = doc.sheetsByIndex[3];
    // const rows = await site_strength_details_sheet.getRows();
    const user_birthday_sheet = doc.sheetsByIndex[7];
    const rows = await user_birthday_sheet.getRows();
    const users_latest_sheet = doc.sheetsByIndex[8];
    const usersRows = await users_latest_sheet.getRows();

    //inserting the whole sheet of site_db
    // const sites : Site[] = [];
    // const site_strengths : SiteStrength[] = [];

    // rows.forEach(x => {
    //   const site: any = {
    //     id: x.id,
    //     name: x.name,
    //     site_code: x.site_code,
    //     shift: +x.shift || 0
    //   };
    //   sites.push(site);

    //   const site_strength: any = {
    //     site_id: +x.id,
    //     strength_count_day: +x.day || 0,
    //     strength_count_general: +x.general || 0,
    //     strength_count_night: +x.night || 0
    //   };
    //   site_strengths.push(site_strength);

    // });

    // // res.send({sites,site_strengths});
    // Site.bulkCreate(sites).then((x) => {
    //   SiteStrength.bulkCreate(site_strengths).then((y) => res.status(200).send(y));
    // });

    //updating the site_db data 
    // const sites : Site[] = [];

    // rows.forEach(x => {
    //   if(x.site_code && x.site_code !== 'CSA-000') {
    //     Site.update({shift_type_id: x.shift_type && +x.shift_type === 8 ? 2 : 1}, {
    //       where: {
    //         site_code: x.site_code
    //       }
    //     }).then((x:any) => {
    //       sites.push(x);
    //     })
    //   }
    // });

    //creating site_strength_details data
    // let sites: Site[] = [];
    // Site
    //   .findAll({
    //     order: [
    //       ['createdAt', 'DESC'],
    //     ]
    //   })
    //   .then((data) => {
    //     sites = data;
    //     const site_strength_details: any[] = [];
    //     const roleIdArray = {
    //       'O':17,
    //       'S':2,
    //       'G':3,
    //       'LS':16,
    //       'CCTV':11
    //     };
    //     rows.forEach(x => {
    //       if(x.site_code) {
    //         const site = sites.find(y => x.site_code === y.site_code);
    //         for (let i = 1; i <= 3; i++){
    //           const shift_column = i === 1 ? 'day' : i === 2 ? 'general' : 'night';
    //           if(+x[shift_column + '_shift'] !== 0) {
    //             const roleWiseCountArray = x[shift_column + '_shift'].split('+');
    //             roleWiseCountArray.forEach((roleCount) => {
    //               const [count, roleChar] = roleCount.trim().split(' ');
    //               site_strength_details.push({
    //                 site_strength_id: site.id,
    //                 role_id: roleIdArray[roleChar.trim()],
    //                 shift: i,
    //                 shift_type_id: x.shift_type && +x.shift_type === 8 ? 2 : 1,
    //                 strength_count: +count.trim(),
    //                 bill_rate: 0,
    //                 wage_rate: 0
    //               });
    //             });
    //           }
    //         }
    //       }
    //     });
    //     SiteStrengthDetails.bulkCreate(site_strength_details).then((y) => {
    //       res.send(y);
    //     });
        
    //   })
    //   .catch((error) => res.status(400).send(error));

    //updating the site_db data 
    const users: User[] = [];
    rows.forEach(x => {
      const user = usersRows.find(u => u.code.trim() === x.code.trim());
      if(user) {
        if(x.dob) {
          const [dt, month, year] = x.dob.split('-');
          x.dob = year.trim() + '-' + month.trim() + '-' + dt.trim();
          user.dob = x.dob;
        } else {
          user.dob = null;
        }
        if(x.start_date) {
          const [sdt, smonth, syear] = x.start_date.split('-');
          x.start_date = syear.trim() + '-' + smonth.trim() + '-' + sdt.trim();
          user.start_date = x.start_date;
        } else {
          user.start_date = null;
        }
        users.push(user);
      }
    });
    usersRows.forEach(x => {
      if(users.findIndex(y => y.id === x.id) === -1) {
        users.push(x);
      }
    });
    User.bulkCreate(users).then(y => res.send(y));
  }
}