/* eslint-disable no-console */
import axios from 'axios';
import { IServer } from 'renderer/types/Server';

interface ICheckServer {
  secs: number;
  data: IServer[];
  onUpdateServerList: (data: IServer[]) => void;
}

export default function CheckServer({
  secs,
  data,
  onUpdateServerList,
}: ICheckServer) {
  const updatedData = data;
  updatedData.map(async (e, index) => {
    setInterval(async () => {
      try {
        // eslint-disable-next-line no-console
        console.log('Sincronizando...');
        if (e.simpleCheck === true) {
          const test = await fetch(e.url).then((response) => response);
          if (!test.ok) {
            e.status = 'Indisponível';
          } else {
            e.status = 'Ativo';
          }
        } else {
          const api = axios.create({
            baseURL: e.url,
            url: `/${e.route}`,
            method: e.method!.toLowerCase(),
          });

          e.status = 'Ativo';
          await api.request({}).catch(() => {
            e.status = 'Indisponível';
          });
        }
      } catch (err) {
        e.status = 'Indisponível';
      }
      onUpdateServerList(updatedData);
      console.log('Sincronizado!');
    }, secs * 1000 * (index + 1));
  });
}
