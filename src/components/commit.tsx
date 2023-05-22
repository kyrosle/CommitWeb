interface CommitProp {
  key: number,
  labels: string[],
  commit: string
}
const Commit: React.FunctionComponent<CommitProp> = ({ labels, commit }) => {
  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
              <span>{generateRandomChars()}</span>
            </div>
          </div>
        </div>
      </td>
      <td>
        {commit}
      </td>
      <td>
        {
          labels.map((label, index) => (
            (<div key={index} className="badge badge-accent badge-outline">{label}</div>)
          ))
        }
      </td>
    </tr>
  )
}

function generateRandomChars(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const randomChars = `${chars.charAt(Math.floor(Math.random() * chars.length))}${chars.charAt(Math.floor(Math.random() * chars.length))}`;
  return randomChars;
}

export default Commit;