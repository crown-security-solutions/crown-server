import { Request, Response } from 'express';
import { Site } from '../models/site.model';
import { SiteStrength } from '../models/site_strength.model';

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
}