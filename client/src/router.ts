// Generouted, changes to this file will be overridden
/* eslint-disable */

import { components, hooks, utils } from "@generouted/react-router/client";

export type Path = `/` | `/collection` | `/g/:key/:id` | `/settings` | `/t/:key/:id`;

export type Params = {
  "/g/:key/:id": { key: string; id: string };
  "/t/:key/:id": { key: string; id: string };
};

export type ModalPath = never;

export const { Link, Navigate } = components<Path, Params>();
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>();
export const { redirect } = utils<Path, Params>();
