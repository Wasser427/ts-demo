
interface OfficialPosition {
  name: string;          // 官职名，如"中书令"、"尚书右仆射"
  grade?: string;        // 品级，如"正三品"、"从二品"
  department?: string;   // 所属部门，如"中书省"、"吏部"
}

interface NobilityTitle {
  name: string;          // 爵位名，如"秦王"、"赵国公"
  grade?: string;        // 等级，如"亲王"、"国公"、"郡公"
}

abstract class PersonProperty {
  private static nextId = 0;

  unique_id!: number;
  name?: string;
  readonly birth_father?: PersonProperty;
  readonly birth_mother?: PersonProperty;
  father?: PersonProperty;
  mother?: PersonProperty;
  gender?: string;
  birth_date?: string;
  official_position?: OfficialPosition;
  nobility_title?: NobilityTitle;

  death_date?: string;
  death_title?: string;//死亡后的封号

  constructor(data: Omit<PersonProperty, 'unique_id'>) {
    this.unique_id = PersonProperty.nextId++;
    Object.assign(this, data);
    // birth_father 自动同步到 father，用户只需写 birth_father 一次
    if (this.birth_father) this.father = this.birth_father;
    if (this.birth_mother) this.mother = this.birth_mother;
  }
}

class Person extends PersonProperty {
  constructor(data: Omit<PersonProperty, 'unique_id'>) {
    super(data);
  }

  /** 根据年份生成随机公历日期，格式 'YYYY-MM-DD' */
  static randomDate(year: number): string {
    const month = Math.floor(Math.random() * 12) + 1;
    const daysInMonth = new Date(year, month, 0).getDate();
    const day = Math.floor(Math.random() * daysInMonth) + 1;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  /** 在列表中按 name 查找 Person */
  static findByName(list: Person[], name: string): Person | undefined {
    return list.find(p => p.name === name);
  }

  /** 在列表中按 unique_id 查找 Person */
  static findById(list: Person[], id: number): Person | undefined {
    return list.find(p => p.unique_id === id);
  }


  print(): void {
    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = this[key as keyof PersonProperty];
        if (val === undefined || val === null) continue;
        if (val instanceof PersonProperty) {
           console.log(`${key}: ${val.name ?? "no name, unique_id = " + val.unique_id}`);
         } else if (val instanceof Object && 'name' in val && !Array.isArray(val)) {
           console.log(`${key}: ${(val as any).name}（品级: ${(val as any).grade ?? '无'}，部门: ${(val as any).department ?? '无'}）`);
         } else {
          console.log(`${key}: ${val}`);
        }
      }
    }
    console.log('------------------------');
  }
}

const personList_0: Person[] = [
  new Person({
    name: '李林',
    gender: '男',
    birth_date: Person.randomDate(1000),
    official_position: { name: '并州刺史', grade: '正四品', department: '地方' },
    death_date: Person.randomDate(1080),
    death_title: '唐景帝',
  }),
  new Person({
    name: '赵氏',
    gender: '女',
    birth_date: Person.randomDate(1005),
    death_date: Person.randomDate(1075),
  }),
  new Person({
    name: '王氏',
    gender: '女',
    birth_date: Person.randomDate(1006),
    death_date: Person.randomDate(1085),
    death_title: '皇太后',
  }),
];

const personList_1: Person[] = [
  new Person({
    name: '李洪',
    gender: '男',
    birth_date: Person.randomDate(1024),
    death_date: Person.randomDate(1024+15),
    birth_father: Person.findByName(personList_0, '李林'),
    birth_mother: Person.findByName(personList_0, '赵氏'),
    nobility_title: { name: '梁王', grade: '亲王' },
    death_title: '梁简王',
  }),
  new Person({
    name: '李湛',
    gender: '男',
    birth_date: Person.randomDate(1026),
    death_date: Person.randomDate(1026+60),
    birth_father: Person.findByName(personList_0, '李林'),
    birth_mother: Person.findByName(personList_0, '赵氏'),
    nobility_title: { name: '赵王', grade: '亲王' },
    death_title: '赵恭王',
  }),
  new Person({
    name: '李源',
    gender: '男',
    birth_date: Person.randomDate(1027),
    birth_father: Person.findByName(personList_0, '李林'),
    birth_mother: Person.findByName(personList_0, '王氏'),

    official_position: { name: '皇帝', department: '中央' },
    nobility_title: { name: '皇帝'},
  }),
];




Person.findByName(personList_1, '李湛')?.print();







