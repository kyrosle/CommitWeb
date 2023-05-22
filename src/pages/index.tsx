import Commit from '@/components/commit'
import Head from 'next/head'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'

interface InfoAlyProp {
  labels: string[],
  text: string,
}

/**
 * 发布评价 - json - {text: string } - {label: [], text: string }
 * label : 全部, 味道好， 味道差， 态度好， 态度差， 卫生状态， 不新鲜， 其他
 * label [cnt]
 * commits:
 *  commit * 1 ~ text ~ labels
 */
export default function Index() {
  useEffect(() => {
    initActive();
    setActive[0](true);
    async function init() {
      const infos = await sendLabel('全部');
      setInfoAly(infos);
    }
    init();
  }, []);
  const [commit, setCommit] = useState('');
  const [infoAly, setInfoAly] = useState<InfoAlyProp[]>([]);

  const [labelCnt0, setCnt0] = useState(0);
  const [labelCnt1, setCnt1] = useState(0);
  const [labelCnt2, setCnt2] = useState(0);
  const [labelCnt3, setCnt3] = useState(0);
  const [labelCnt4, setCnt4] = useState(0);
  const [labelCnt5, setCnt5] = useState(0);
  const [labelCnt6, setCnt6] = useState(0);
  const [labelCnt7, setCnt7] = useState(0);

  const labelCnt = [labelCnt0, labelCnt1, labelCnt2, labelCnt3, labelCnt4, labelCnt5, labelCnt6, labelCnt7];
  const setCnt = [setCnt0, setCnt1, setCnt2, setCnt3, setCnt4, setCnt5, setCnt6, setCnt7];

  const [labelActive0, setActive0] = useState(true);
  const [labelActive1, setActive1] = useState(false);
  const [labelActive2, setActive2] = useState(false);
  const [labelActive3, setActive3] = useState(false);
  const [labelActive4, setActive4] = useState(false);
  const [labelActive5, setActive5] = useState(false);
  const [labelActive6, setActive6] = useState(false);
  const [labelActive7, setActive7] = useState(false);

  const labelActive = [labelActive0, labelActive1, labelActive2, labelActive3, labelActive4, labelActive5, labelActive6, labelActive7];
  const setActive = [setActive0, setActive1, setActive2, setActive3, setActive4, setActive5, setActive6, setActive7];

  const initActive = async () => {
    setActive.forEach((setActive) => setActive(false));
    await setCnts();
  }

  const setCnts = async () => {
    const cnts: number[] = await fetchCnts();
    cnts.forEach((cnt, index) => setCnt[index](cnt))
  }


  const textChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setCommit(e.target.value);
  }

  const onclick = async () => {
    const res = await fetch('/api/information_analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: commit })
    });
    const data: InfoAlyProp = await res.json();
    console.log(data);
    await initActive();
    setInfoAly([data]);
  }

  const showCommits = (commits: InfoAlyProp[]) => {
    return (commits.map((commit, index) => <Commit key={index} labels={commit.labels} commit={commit.text} />))
  }

  return (
    <div>
      <Head>
        <title>首页</title>
      </Head>
      <div>
        <div className="flex flex-col w-full border-opacity-50">
          <div className="grid card bg-base-300 rounded-box place-items-center">首页 / 全部商品 / 评价</div>
          <div className="divider" />
          <div className="grid card rounded-box place-items-center" >
            <div style={{ display: 'flex' }}>
              <textarea placeholder="输入评价" className="textarea textarea-bordered textarea-lg w-full max-w-xs" onChange={textChange} />
              <button className="btn btn-outline btn-success" style={{ height: '80px', margin: '10px' }} onClick={onclick}>发布评价</button>
            </div>
          </div>
          <div className="divider" />
          <div className="grid card bg-base-300 rounded-box place-items-center">
            <div className="btn-group btn-group-vertical lg:btn-group-horizontal" style={{ margin: '10px' }}>
              {/* label : 全部, 味道好， 味道差， 态度好， 态度差， 卫生状态， 不新鲜， 其他 */}
              <Button label='全部' cnt={labelCnt[0]} active={labelActive[0]} setActive={setActive[0]} initActive={initActive} setInfoAly={setInfoAly} />
              <Button label='味道好' cnt={labelCnt[1]} active={labelActive[1]} setActive={setActive[1]} initActive={initActive} setInfoAly={setInfoAly} />
              <Button label='味道差' cnt={labelCnt[2]} active={labelActive[2]} setActive={setActive[2]} initActive={initActive} setInfoAly={setInfoAly} />
              <Button label='态度好' cnt={labelCnt[3]} active={labelActive[3]} setActive={setActive[3]} initActive={initActive} setInfoAly={setInfoAly} />
              <Button label='态度差' cnt={labelCnt[4]} active={labelActive[4]} setActive={setActive[4]} initActive={initActive} setInfoAly={setInfoAly} />
              <Button label='卫生状态' cnt={labelCnt[5]} active={labelActive[5]} setActive={setActive[5]} initActive={initActive} setInfoAly={setInfoAly} />
              <Button label='不新鲜' cnt={labelCnt[6]} active={labelActive[6]} setActive={setActive[6]} initActive={initActive} setInfoAly={setInfoAly} />
              <Button label='其他' cnt={labelCnt[7]} active={labelActive[7]} setActive={setActive[7]} initActive={initActive} setInfoAly={setInfoAly} />
            </div>
          </div>
          <div className="divider" />
          <div className="grid card bg-base-300 rounded-box place-items-center">
            <div style={{ width: '80%', overflowX: 'scroll', height: '48vh' }}>
              <table className="table w-full" >
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody >
                  {showCommits(infoAly)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ButtonProp {
  label: string,
  cnt: number,
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
  initActive: () => void
  setInfoAly: Dispatch<SetStateAction<InfoAlyProp[]>>
}

const fetchCnts = async () => {
  const url = '/api/get_information';
  const res = await fetch(url, { method: 'GET' });
  const data = await res.json();
  const cnt = data.data;
  console.log(cnt);
  return cnt;
}

const sendLabel = async (label: string) => {
  const url = '/api/get_information';
  const json = { label: label };
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(json) });
  const commits: InfoAlyProp[] = await res.json();
  console.log(commits);
  return commits;
}

const Button: React.FunctionComponent<ButtonProp> = ({ label, cnt, active, setActive, initActive, setInfoAly }) => {
  return (
    <button
      className={`btn ${active && 'btn-active'}`}
      onClick={
        async () => {
          await initActive();
          const infos = await sendLabel(label);
          setInfoAly(infos);
          setActive(!active);
        }} >
      {label}
      <span style={{ margin: '0 10px' }}>
        {cnt}
      </span >
    </button >
  )
}
