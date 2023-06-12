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
  updatedData.forEach(async (e, index) => {
    setTimeout(async () => {
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
      onUpdateServerList(updatedData);
    }, secs * 1000 * (index + 1));
  });
}
