import { UserInfo } from "../../graphql/types/user";

export const Account = ({ getUser: user }: UserInfo): JSX.Element => {
  const { name, lastName, siteNumber, role: roles } = user;
  return (
    <div>
      <div>
        <div>Личные данные:</div>
        <div>Аватар</div>
        <div>
          <p>Имя:</p>
          <p>{name}</p>
        </div>
        <div>
          <p>Фамилия:</p>
          <p>{lastName}</p>
        </div>
        <div>
          <p>Номер участка:</p>
          <p>{siteNumber}</p>
        </div>
        <div>
          <p>Статус:</p>
          <div>
            {roles?.map(({ id, role }) => (
              <p key={id}>{role}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
