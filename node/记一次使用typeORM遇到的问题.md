## 使用typeORM，配置实体类的create_time为datetime类型出现的时间不一致和格式问题

typeORM配置实体类有两个特殊的列类型可供选择：

- `@CreateDateColumn` 是一个特殊列，自动为实体插入日期。
- `@UpdateDateColumn` 是一个特殊列，在每次调用实体管理器或存储库的save时，自动更新实体日期。

以下是实际代码：

```typescript
@CreateDateColumn({
  type: 'datetime',
  name: 'create_time',
  precision: 3,
  default: () => 'CURRENT_TIMESTAMP(3)',
})
createTime?: Date;

@UpdateDateColumn({
	type: 'datetime',
  name: 'update_time',
  precision: 3,
  default: () => 'CURRENT_TIMESTAMP(3)',
  onUpdate: 'CURRENT_TIMESTAMP(3)',
})
updateTime?: Date;
```

此时会发现使用`find`方法查询出来的数据，时间列和数据库里的时间并不一致，造成的原因是typeORM的时区配置和mysql的时区配置不一样。此时尝试按照[文档](https://typeorm.io/entities)给的方案在配置文件增加`timezone: '+8'`的配置。

```js
typeorm: {
    dataSource: {
      default: {
        timezone:'+8'
      },
    },
}
```

> `timezone` - the timezone configured on the MySQL server. This is used to typecast server date/time values to JavaScript Date object and vice versa. This can be `local`, `Z`, or an offset in the form `+HH:MM` or `-HH:MM`. (Default: `local`)

发现问题解决，只是返回的时间格式并不是我们想要的:2022-10-11T05:53:27.000Z。

再次按照文档给的方案增加[`dateStrings`](https://typeorm.io/data-source-options#mysql--mariadb-data-source-options)属性，发现并不生效，且返回的时间又和数据库对不上了。未找到问题所在。

> `dateStrings` - Force date types (`TIMESTAMP`, `DATETIME`, `DATE`) to be returned as strings rather than inflated into JavaScript Date objects. Can be true/false or an array of type names to keep as strings. (Default: `false`)

然后尝试使用[`transformer`](https://typeorm.io/entities#column-options)属性，给写入和读取的时间做处理之后再返回，发现格式问题解决了，但时间又和数据库对不上了。

> `transformer: { from(value: DatabaseType): EntityType, to(value: EntityType): DatabaseType }` - Used to marshal properties of arbitrary type `EntityType` into a type `DatabaseType` supported by the database. Array of transformers are also supported and will be applied in natural order when writing, and in reverse order when reading. e.g. `[lowercase, encrypt]` will first lowercase the string then encrypt it when writing, and will decrypt then do nothing when reading.

最后发现去掉一开始的typeORM配置文件中的`timezone:'+8'`这一配置项，不仅解决了时间不一致问题，格式也成为了我们想要的`YYYY-MM-DD HH:mm:ss。

完整配置如下：

实体类配置：

```typescript
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import * as dayjs from 'dayjs';

const dateTransformer = {
  from: (value: Date | number) => {
    return dayjs(typeof value === 'number' ? value : value.getTime()).format('YYYY-MM-DD HH:mm:ss');
  },
  to: () => new Date(),
};
@Entity('t_user')
export class User {
  @PrimaryGeneratedColumn({
    name: 'user_id',
  })
  userId?: number;

  @Column({
    length: 100,
    name: 'user_name',
  })
  userName: string;

  @Column({
    length: 11,
    name: 'user_phone',
  })
  userPhone?: string;

  @Column({
    length: 64,
    name: 'user_email',
  })
  userEmail: string;

  @Column({
    length: 128,
    name: 'user_pwd',
  })
  userPwd: string;

  @Column({
    length: 100,
    name: 'user_address',
  })
  userAddress?: string;

  @CreateDateColumn({
    type: 'datetime',
    name: 'create_time',
    precision: 3,
    transformer: dateTransformer,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  createTime?: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'update_time',
    precision: 3,
    transformer: dateTransformer,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  updateTime?: Date;
}
```